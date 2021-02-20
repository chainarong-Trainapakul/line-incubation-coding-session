import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import Show from './Show';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("")
  const [urlServer, setURLServer] = useState("")


  const [dataMessage, setDataMessage] = useState({})
  const handleConnect = (event) => {
    console.log(username)
    const dataReq = {user: username, message: urlServer}
    const result = axios.post(
      `https://chat-room-be.herokuapp.com/message`,
      {
          user: username,
          message: urlServer,
      }
      ).catch(function (error) {
          console.log(error)
      })
      //setData(result.data)
      console.log(result)
      
      const getChatHistory = axios.get(
        `https://chat-room-be.herokuapp.com/message`,
      ).catch(function (error) {
        console.log(error)
      })
      console.log(getChatHistory)
      setDataMessage(getChatHistory)
  }



  const handleName = (event) => {
    setUsername(event.target.value)
    //console.log(username)
  }

  const handleURL= (event) => {
    setURLServer(event.target.value)
    //console.log(urlServer)
  }





  return (
    <div className="App">
      <ul>
        <li>
          <label> username 
            <input type="text" name="username" onChange={handleName}/>
          </label>
          <label> chat server 
            <input type="text" name="chat-server" onChange={handleURL}/>
          </label>
          <button onClick={handleConnect} > connect </button>
        </li>
      </ul>

      <Show item={dataMessage}/>
    </div>
  );
}

export default App;
