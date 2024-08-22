import axios from "axios";
localStorage.setItem("token", "test");
axios.post("https://extramixture-api.vercel.app/auth", {
    token: localStorage.getItem("token")
}).then((response) => {
    if(response.data.error){
        window.location.href = "/login";
    }
})