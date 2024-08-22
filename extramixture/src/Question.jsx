import { useState } from 'react'
import trash from './images/trash.svg'
import styles from './addQuestion.module.css'
import ReactModal from 'react-modal';
function AddQuestion(editModal) {
  const modalStyle = {
    content: {
      position: 'absolute',
      inset: "40px",
      overflow: 'auto',
      background: 'transparent',
      WebkitOverflowScrolling: 'touch',
      border: 'none',
    }
  };
  const [options, setOptions] = useState([{
    text: 'a',
    correct: false
  }, {
    text: 'b',
    correct: false
  }, {
    text: 'c',
    correct: false
  }, {
    text: 'd',
    correct: false
  }])
  function addOption() {
    setOptions([...options, {
      text: '',
      correct: false
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
  return (
    <>
      <ReactModal isOpen={editModal} style={modalStyle}>
        <div className={styles.main}>
          <div className={styles.add_question}>
            <button className={styles.close}>X</button>
            <div className={styles.top_container}>
              <div className={styles.text_style}>
                <button className={styles.bold}>B</button>
                <button className={styles.italic}>I</button>
                <button className={styles.underline}>U</button>
              </div>
              <div className={styles.equation}>Add equation</div>
              <button className={styles.change_type}>Multiple Choice</button>
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
                  return <div className={styles.option} key={index}>
                    <div className={styles.container}>
                      <button className={styles.correct}></button>
                      <textarea value={option.text} onChange={(e) => { changeOption(e, index) }}></textarea>
                    </div>
                    <button className={styles.delete} onClick={(e) => { deleteOption(index) }}><img src={trash} /></button>
                  </div>
                })}
                <div className={styles.add_option}>
                  <button onClick={addOption}>Add option +</button>
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  )
}

export default AddQuestion
