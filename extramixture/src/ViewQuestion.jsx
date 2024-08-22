import './view-question.css'
import change from './images/change.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
function ViewQuestion() {
    const [questionCount, setQuestionCount] = useState("0 question")
    const [questions, setQuestions] = useState([])
    const [showAnswers, setShowAnswers] = useState([])
    function toggleShowAnswers(index) {
        if(showAnswers.includes(index)){
            setShowAnswers(showAnswers.filter((item) => item !== index))
        }else{
            setShowAnswers([...showAnswers, index])
        }
    }
    useEffect(() => {
        const url = "http://localhost:5174/getquestions/" + new URLSearchParams(window.location.search).get("id")
        axios.get(url).then((response) => {
            setQuestions(response.data)
            if (response.data.length > 2) {
                setQuestionCount(response.data.length + " questions")
            } else {
                setQuestionCount(response.data.length + " question")
            }
        })
    }, [])
    return (
        <>
            <div className="control">
                <div className="image"></div>
                <div className="questions-title">Name of project</div>
                <a>Host</a>
                <a href={"/edit-question?id=" + new URLSearchParams(window.location.search).get("id")}>Edit</a>
                <a>Assign homework</a>
                <a>Move to folder</a>
                <a>Export</a>
            </div>
            <div className="show-questions">
                <div className="info">
                    <div className="questions-count">{questionCount}</div>
                    <button className="show-answers">Show answers</button>
                </div>
                {questions.map((question, index) => {
                    var answer;
                    if(showAnswers.includes(index)){
                        answer = (<div className='show-answers'>
                        <div className='question-text'>{question.question}</div>
                        <div className='options-container'>
                            {question.options.map((option, index) => {
                                var correctIndicator
                                if (question.correct.includes(index)) {
                                    correctIndicator = <div className='correct'> </div>
                                } else {
                                    correctIndicator = <div className='incorrect'> </div>
                                }
                                if(question.type === 'Type Answer'){
                                    correctIndicator = ">"
                                }
                                return (
                                    <div className='options'>
                                        {correctIndicator}
                                        {option.text}
                                    </div>
                                )
                            })}
                            {answer}
                        </div>
                    </div>)
                    }else{
                        answer = null
                    }
                    return (
                        <div>
                            <div className="question" onClick={()=>{toggleShowAnswers(index)}}>
                                <div className="question-container1">
                                    <div className="question-number">{"Question " + (index + 1)}</div>
                                    <div className="question-type">{question.type}</div>
                                </div>
                                {answer}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}
export default ViewQuestion;