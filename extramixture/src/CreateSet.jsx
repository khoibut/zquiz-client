import "./create-set.css"
import axios from "axios";
function CreateSet() {
    function sendAddSetRequest() {
        const setName = document.querySelector("input[type=text]").value;
        console.log(setName);
        axios.post("http://localhost:5174/addset",{
            name:setName,
            questions:[],
            author:localStorage.getItem("token"),
            lastEdited:new Date(),
            playCount:0
        }).then((response) => {
            window.location.href = "/";
        }).catch((error) => {
            console.log(error);
        });
    }
        return (
            <>
                <div className="create-set">
                    <h1>Create a new set</h1>
                    <div className="add-image">
                        <button>Add Image</button>
                        <input type="file" className="image" hidden />
                    </div>
                    <div className="setName">Name:</div>
                    <input type="text"></input>
                    <div className="done">
                        <button onClick={sendAddSetRequest}>Done</button>
                    </div>
                </div>
            </>
        )
    }
    export default CreateSet;