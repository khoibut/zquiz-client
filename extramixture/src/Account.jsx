import axios from "axios";
import { useEffect, useState } from "react";
function Account() {
    const[Username, setUsername] = useState("");
    useEffect(() => {
        axios.post("https://extramixture-api.vercel.app/auth", {
            token: localStorage.getItem("token")
        }).then((response) => {
            if(response.data.error){
                window.location.href = "/login";
            }else{
                setUsername(response.data.username)
            }
        })
    },[])
    return (
        <>
                <a id="username">{Username}</a>
        </>
    )
}
export default Account