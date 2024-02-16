import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './Board';
import Modal from './Modal';

function App() {
  const [search,setSearchbar] = useState("");
  const [usergames,setUsergames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter,setFilter] = useState("none");
  const [filteredArray,setArray] = useState([]);

  const handleFilter = async (filter) => {
    const res = await axios.get(`https://lichess.org/api/games/user/${search}`,{
      params : {
        max : 10,
        perfType : filter
      }});
      const arr = parsePGNs(res);
      console.log(arr);
      setArray(arr);
  }

  function parsePGNs(pgnString) {
    const games = [];

    // Split the PGN string into individual games
    const gameStrings = pgnString.trim().split('\n\n');

    // Iterate through each game string
    gameStrings.forEach(gameString => {
        const gameData = {};

        // Split the game string into individual lines
        const lines = gameString.trim().split('\n');

        // Iterate through each line
        lines.forEach(line => {
            // Split the line into key and value
            const [key, value] = line.replace(/^\[|\]$/g, '').split(' "');

            // Store the key-value pairs in gameData
            if (key && value) {
                gameData[key.trim()] = value.replace(/"\s*$/, '');
            }
        });

        // Push the parsed game data into the games array
        if (Object.keys(gameData).length > 0) games.push(gameData);
    });

    return games;
}

  const handleBoardClick = (game) => {
    console.log(game);
    setSelectedGame(game);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(search);
      const res = await axios.get(`https://lichess.org/api/games/user/${search}`,{
      params : {
        max : 10
      }});
      // console.log(res.data);
      const games = parsePGNs(res.data);
      console.log(games);
      setUsergames(games);
    }
    catch(err){
      console.log("Server error", err);
    }
  }
  return (
    <div className="App">
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={filter} onChange={(e)=>setFilter(e.target.value)}>
        <option value="">Select...</option>
        <option value="none">none</option>
        <option value="blitz">Blitz</option>
        <option value="rapid">Rapid</option>
      </select>
      <form className='username' onSubmit={handleSubmit}>
      <input type='text' onChange={(e) => {setSearchbar(e.target.value)}} />
      <button type='submit'>Search</button>
      </form>
      <ol>
      {(filter != "none") && filteredArray && filteredArray.map((object,index) => (
        <li key = {index}>
          <Board 
            object={object}
            search={search}
            // func={() => handleBoardClick(object)}
            onClick = {() => handleBoardClick(object)}
            />
        </li>
       ))}
       {(filter == "none") && usergames && usergames.map((object,index) => (
        <li key = {index}>
          <Board 
            object={object}
            search={search}
            // func={() => handleBoardClick(object)}
            onClick = {() => handleBoardClick(object)}
            />
        </li>
       ))}
       </ol>
       {isModalOpen && selectedGame &&
        <Modal
          game={selectedGame}
          onClose={closeModal}
          isOpen={isModalOpen}
        />
      } 
    </div>
  );
}

export default App;
