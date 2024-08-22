import './edit-page.css'
import confirm from './images/confirm.png'
import change from './images/change.png'
import book from './images/book.png'
import { useState, useEffect } from 'react'
import trash from './images/trash.svg'
import styles from './addQuestion.module.css'
import ReactModal from 'react-modal';
import axios from 'axios'
ReactModal.setAppElement('.main')
function EditQuestions() {
    const modalStyle = {
        content: {
            zIndex: 100,
            position: 'absolute',
            inset: "40px",
            overflow: 'auto',
            background: 'transparent',
            WebkitOverflowScrolling: 'touch',
            border: 'none',
        },
        overlay:{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
        }
    };
    const[modalMode, setModalMode] = useState({ mode: "add", index: -1 })
    const [editModalState, setEditModalState] = useState(false)
    function openEditModal() {
        setModalMode({ mode: "add", index: -1 })
        setEditModalState(true)
    }
    function closeEditModal(save) {
        if (!save) {
            setEditModalState(false)
        } else {
            if(modalMode.mode === "add"){
                const url = 'https://extramixture-api.vercel.app/addquestion/' + new URLSearchParams(window.location.search).get('id')
                const question = document.querySelector(`.${styles.mid_container} textarea`).value
                const data = {
                    question: question,
                    type: questionType,
                    options: options,
                    correct: correctState
                }
                axios.post(url, data, {
                }).then((res) => {
                    const temp = [...questions, data]
                    setQuestions([...questions, data])
                    if (temp >= 2) {
                        setQuestionCount(temp.length + " questions")
                    } else {
                        setQuestionCount(temp.length + " question")
                    }
                    setOptions([])
                    setCorrectState([])
                    setEditModalState(false)
                    setQuestionType("Multiple Choice")
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                const url = 'https://extramixture-api.vercel.app/editquestion/' + new URLSearchParams(window.location.search).get('id')
                const question = document.querySelector(`.${styles.mid_container} textarea`).value
                const data = {
                    index: modalMode.index,
                    question: question,
                    type: questionType,
                    options: options,
                    correct: correctState
                }
                axios.patch(url, data, {
                }).then((res) => {
                    const temp = [...questions]
                    temp[modalMode.index] = data
                    setQuestions(temp)
                    setOptions([])
                    setCorrectState([])
                    setEditModalState(false)
                    setQuestionType("Multiple Choice")
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
    const [options, setOptions] = useState([])
    const [correctState, setCorrectState] = useState([])
    const [questions, setQuestions] = useState([])
    const [questionCount, setQuestionCount] = useState("")
    const [questionType, setQuestionType] = useState("Multiple Choice")
    const [toggleAdd, setToggleAdd] = useState(false)
    const [showAnswers, setShowAnswers] = useState([])
    function toggleShowAnswers(e,index) {
        if(e.target.className!=="checkbox" && e.target.className!==""){
            if (showAnswers.includes(index)) {  
                setShowAnswers(showAnswers.filter((item) => item !== index))
            } else {
                setShowAnswers([...showAnswers, index])
            }
        }
    }
    function modalOpenHandler(){
        if(modalMode.mode === "add"){
            document.querySelector(`.${styles.mid_container} textarea`).value = ""
        }else{
            document.querySelector(`.${styles.mid_container} textarea`).value = questions[modalMode.index].question
        }
    }
    function deleteQuestions(index){
        console.log(index)
        const url='https://extramixture-api.vercel.app/deletequestion/' + new URLSearchParams(window.location.search).get('id')
        axios.post(url, {index: index}).then((res)=>{
            const temp = [...questions]
            temp.splice(index, 1)
            setQuestions(temp)
            if (temp.length >= 2) {
                setQuestionCount(temp.length + " questions")
            } else {
                setQuestionCount(temp.length + " question")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    function editQuestion(index) {
        setModalMode({ mode: "edit", index: index })
        setOptions(questions[index].options)
        setCorrectState(questions[index].correct)
        setQuestionType(questions[index].type)
        setEditModalState(true)
    }
    useEffect(() => {
        const url = "https://extramixture-api.vercel.app/getquestions/" + new URLSearchParams(window.location.search).get("id")
        axios.get(url).then((response) => {
            setQuestions(response.data)
            if (response.data.length >= 2) {
                setQuestionCount(response.data.length + " questions")
            } else {
                setQuestionCount(response.data.length + " question")
            }
        })
    }, [])
    function clickedCheckbox(index){
        setShowAnswers(showAnswers.filter((item) => item !== index))
    }
    function toggleType() {
        if (questionType === "Multiple Choice") {
            setOptions([{ text: '' }])
            setCorrectState([0])
            setToggleAdd(true)
            setQuestionType("Type Answer")
        } else {
            setToggleAdd(false)
            setOptions([])
            setCorrectState([])
            setQuestionType("Multiple Choice")
        }
    }
    function addOption() {
        setOptions([...options, {
            text: '',
        }])
    }
    function changeOption(e, index) {
        var temp = [...options]
        temp[index].text = e.target.value
        setOptions(temp)
    }
    function deleteOption(index) {
        var temp = [...options.slice(0, index), ...options.slice(index + 1)]
        setOptions(temp)

    }
    function toggleCorrect(index) {
        if (correctState.includes(index)) {
            setCorrectState([...correctState.filter((item) => item !== index)])
        } else {
            setCorrectState([...correctState, index])
        }
    }
    return (
        <>
            <ReactModal isOpen={editModalState} style={modalStyle} onAfterOpen={modalOpenHandler}>
                <div className={styles.main} modalMode={modalMode.mode} index={modalMode.index}>
                    <div className={styles.add_question}>
                        <button className={styles.close} onClick={() => { closeEditModal(false) }}>X</button>
                        <div className={styles.top_container}>
                            <div className={styles.text_style}>
                                <button className={styles.bold}>B</button>
                                <button className={styles.italic}>I</button>
                                <button className={styles.underline}>U</button>
                            </div>
                            <div className={styles.equation}>Add equation</div>
                            <button className={styles.change_type} onClick={toggleType}>{questionType}</button>
                        </div>
                        <div className={styles.mid_container}>
                            <div className={styles.add_image}><button>Add image</button></div>
                            <textarea placeholder="Add text"></textarea>
                        </div>
                        <div className={styles.bottom_container}>
                            <div className={styles.options}>
                                <template>
                                    <div className={styles.option}>
                                        <div className={styles.container}>
                                            <button className={styles.correct}></button>
                                            <textarea></textarea>
                                        </div>
                                        <button className={styles.delete}><img src={trash} /></button>
                                    </div>
                                </template>
                                {options.map((option, index) => {
                                    var correct
                                    if (correctState.includes(index)) {
                                        correct = <button className={styles.correct} onClick={() => { toggleCorrect(index) }}></button>
                                    }
                                    else {
                                        correct = <button className={styles.incorrect} onClick={() => { toggleCorrect(index) }}></button>
                                    }
                                    if (questionType === "Type Answer") {
                                        correct = null
                                    }
                                    return <div className={styles.option} key={index}>
                                        <div className={styles.container}>
                                            {correct}
                                            <textarea value={option.text} onChange={(e) => { changeOption(e, index) }}></textarea>
                                        </div>
                                        <button className={styles.delete} onClick={(e) => { deleteOption(index) }}><img src={trash} /></button>
                                    </div>
                                })}
                                <div className={styles.add_option}>
                                    <button onClick={addOption} hidden={toggleAdd}>Add option +</button>
                                    <button onClick={() => { closeEditModal(true) }}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
            <div className="control">
                <div className="image"></div>
                <div className="questions-title">Name of project</div>
                <button>Edit details</button>
                <button onClick={openEditModal}>+Add questions</button>
                <button>+Add from discovery</button>
                <button>Import</button>
                <button>Export</button>
            </div>
            <div className="bulk-edit">
                <div className="bulk-edit-container">
                    <button className="delete" onClick={deleteQuestions}><img src={trash} /></button>
                    <button className="change-type">Change question type</button>
                </div>
                <button className="confirm"><img src={confirm} /></button>
            </div>
            <div className="show-questions">
                <div className="info">
                    <div className="questions-count">{questionCount}</div>
                    <button className="show-answers">Show answers</button>
                </div>
                {questions.map((question, index) => {
                    var answer;
                    if (showAnswers.includes(index)) {
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
                                    if (question.type === 'Type Answer') {
                                        correctIndicator = ">"
                                    }
                                    return (
                                        <div className='options' key={index}>
                                            {correctIndicator}
                                            {option.text}
                                        </div>
                                    )
                                })}
                                {answer}
                            </div>
                        </div>)
                    } else {
                        answer = null
                    }
                    return (
                        <div>
                            <div className="question" onClick={(e) => {
                                toggleShowAnswers(e,index)
                            }} key={index}>
                                <div className="question-container1">
                                    <div className='question-title'>
                                    <input type="checkbox" className='checkbox'/>
                                    <div className="question-number">{"Question " + (index + 1)}</div>
                                    <div className="question-type">{question.type}</div>
                                    </div>
                                    <div className="config-question">
                                        <button className="edit-question" onClick={()=>{editQuestion(index)}}><img src={change} /></button>
                                        <button className="delete-question" onClick={()=>{deleteQuestions(index)}}><img src={trash} /></button>
                                    </div>
                                </div>
                                {answer}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export { EditQuestions }