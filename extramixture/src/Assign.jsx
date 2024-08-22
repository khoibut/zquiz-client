import axios from "axios";
import "./assign.css";
function Assign() {
    function startAssignment() {
        if(document.getElementById('days').value == "" || document.getElementById('hours').value == "" || document.getElementById('minutes').value == "" || document.getElementById('score').value == "" || document.getElementById('scoreEach').value == "") {
            alert("Please fill all the fields");
            return;
        }
        let days = document.getElementById('days').value;
        let hours = document.getElementById('hours').value;
        let minutes = document.getElementById('minutes').value;
        let deadline = new Date();
        deadline.setDate(deadline.getDate() + parseInt(days));
        deadline.setHours(deadline.getHours() + parseInt(hours));
        deadline.setMinutes(deadline.getMinutes() + parseInt(minutes));
        const url='https://extramixture-api.vercel.app/newassignment';
        axios.post(url, {
            author: localStorage.getItem("token"),
            set: new URLSearchParams(window.location.search).get("id"),
            deadline: deadline,
            goal: document.getElementById('score').value,
            point: document.getElementById('scoreEach').value
        }).then((response) => {
            window.location.href = "/host?id="+response.data.id
        })
    }
    return (
        <>
            <div className="info">
                <div className="project-name">Project Name</div>
                <div className="deadline">
                    <div className="title">
                        Deadline
                    </div>
                    <div className="days">
                        Days
                        <input type="number" name="days" id="days"/>
                    </div>
                    <div className="hours">
                        Hours
                        <input type="number" name="hours" id="hours"/>
                    </div>
                    <div className="minutes">
                        Minutes
                        <input type="number" name="minutes" id="minutes"/>
                    </div>
                </div>
                <div className="more-settings">
                    <div className="title">More settings</div>
                    <div className="score">Goal Score <input type="number" id="score"/></div>
                    <div className="scoreEach">Score each question <input type="number" id="scoreEach" /></div>
                </div>
                <div className="start">
                    <button onClick={startAssignment}>Assign now</button>
                </div>
            </div>
        </>
    )
}
export default Assign;