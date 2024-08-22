import axios from "axios";
localStorage.setItem("token", "test");
axios.post("http://localhost:5174/auth", {
    token: localStorage.getItem("token")
}).then((response) => {
    if(response.data.error){
        window.location.href = "/login";
    }
})