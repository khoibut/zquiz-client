import './home.css'
import axios from 'axios'
import newFolder from './images/newfolder.png'
import showFolder from './images/showfolder.png'
import search from './images/search.png'
import eye from './images/eye.svg'
import edit from './images/edit.png'
import trash from './images/trash.svg'
import gear from './images/gear.png'
import assign from './images/assign.png'
import play from './images/play.png'
import { useState } from 'react'
import { useEffect } from 'react'
function Dashboard() {
    const [setList, updateSetList] = useState([])
    useEffect(() => {
        const url="http://localhost:5174/getset/"+localStorage.getItem("token")
        axios.get(url).then((response) => {
            updateSetList(response.data)
        })
    },[])
    return (
        <>
            <div>
                
            </div>
            <div className="control">
                <img src={newFolder} className="folder" />
                <img src={showFolder} className="folder" />
                <div className="search-bar">
                    <img src={search} id="search" />
                    <input type="text" placeholder="Search" className="search-input" />
                </div>
            </div>
            <div className="content">
                {setList.map((set) => {
                    return(
                        <div className="card" key={set.id}>
                            <div className="card-title">
                                <div className="questions-count">
                                    {set.questions.length} questions
                                </div>
                            <a href={"view-page?id="+set.id}><img src={eye} /></a>
                            </div>
                            <div className="description">
                                {set.name}
                            </div>
                            <div className="info">
                                <div className="play-count">{set.playCount} plays</div>
                                <div className="last-edited">Last edited today</div>
                            </div>
                            <div className="operate">
                                <button className="edit"><a href={"/edit-question?id="+set.id}><img src={edit}/></a></button>
                                <button className="delete"><img src={trash} /></button>
                                <button className="option"><img src={gear} /></button>
                            </div>
                            <div className="start">
                                <a href={"/assign-options?id="+set.id} className="assign"><img src={assign} />Assign</a>
                                <a href={"/host?id="+set.id} className="host"><img src={play} />Host</a>
                            </div>
                        </div>
                    )
                })}
            </div >
        </>
    )
}
export default Dashboard;