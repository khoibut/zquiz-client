import React from "react";
import ReactDOM from 'react-dom/client'
import './index.css'
import './play.css'
import axios from "axios";
function Question() {
    const [questionnumber, setQuestionNumber] = React.useState(0)
    const [questionsList, setQuestionsList] = React.useState([])
    const [optionsList, setOptionsList] = React.useState([])
    const [question, setQuestion] = React.useState({ options: [] })
    const [disabled, setDisabled] = React.useState(false)
    function Answer(index, disabled) {
        var options=document.getElementsByClassName("option")
        setDisabled(true)
        if(questionsList[questionnumber].correct.includes(index)){
            for(let i=0;i<options.length;i++){
                options[i].style.backgroundColor="#00FF00"
            }
        }else
        {
            for(let i=0;i<options.length;i++){
                options[i].style.backgroundColor="#FF0000"
            }
        }
        setTimeout(() => {
            for(let i=0;i<options.length;i++){
                options[i].style.backgroundColor=randomColor[Math.floor(Math.random()*randomColor.length)]
            }
            setQuestionNumber(Math.floor(Math.random() * questionsList.length))
        }, 1000);
    }
    React.useEffect(() => {
        const url = "http://localhost:5174/getassignment/" + new URLSearchParams(window.location.search).get("id")
        axios.get(url).then((response) => {
            setQuestionsList(response.data[0].questions)
            setQuestionNumber(Math.floor(Math.random() * response.data[0].questions.length))
        })
    }, [])
    function shuffle(array) {
        var arrayb = [...array]
        let currentIndex = arrayb.length;

        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [arrayb[currentIndex], arrayb[randomIndex]] = [
                arrayb[randomIndex], arrayb[currentIndex]];
        }
        return arrayb;
    }
    const randomColor = ["#FFC700", "#00D1FF", "#00CD08", "#FF0000", "#CE8AF8", "#FAFF00"]
    return (
        <>
            {console.log(questionsList.length==0?null:typeof(questionsList[questionnumber].options))}
            <div className="questionArea" key="index">
                <div>Question</div>
                <div className="questionContainer">
                    <div className="question">{questionsList.length==0?null:questionsList[questionnumber].question}</div>
                </div>
            </div>
            <div className="optionsArea">
            {questionsList.length==0?null:questionsList[questionnumber].options.map((option, index) => {
                return (
                        <div className="option" style={{ backgroundColor: randomColor[index] }} onClick={()=>{Answer(index,disabled)}}>{option.text}</div>
                    )
                })}
                </div>
        </>
    )
}
ReactDOM.createRoot(document.getElementsByClassName('main')[0]).render(
    <React.StrictMode>
        <Question />
    </React.StrictMode>
)