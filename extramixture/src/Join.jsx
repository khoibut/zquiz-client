import React from "react";
import ReactDOM from 'react-dom/client'
import './index.css'
import './join.css'
import axios from "axios";
function Join() {
    function joinGame() {
        let gameId = document.getElementById('game-id').value;
        let name = document.getElementById('name').value;
        if(gameId == "" || name == "") {
            alert("Please fill all the fields");
            return;
        }
        axios.get("http://localhost:5174/checkgameexist/"+gameId).then((response) => {
            if(response.data.data == false) {
                alert("Game does not exist");
            }else if(response.data.data == true) {
                window.location.href = "/play?id="+gameId+"&name="+name;
            }
        })
    }
    return (
        <>
            <div className="title">ZquiZ</div>
            <input type="number" placeholder="Game ID" id="game-id"/>
            <input type="text" placeholder="Name" id="name"/>
            <button onClick={joinGame}>Join</button>
        </>
    )
}
ReactDOM.createRoot(document.getElementsByClassName('main')[0]).render(
    <React.StrictMode>
        <Join />
    </React.StrictMode>
)