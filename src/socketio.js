import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


const URL = "http://localhost:8080/"

const socket = new io(URL, {
    extraHeaders: {
        authorization: Cookies.get("token"),
        company: Cookies.get("company")
    },
    reconnectionAttempts: 1
})

socket.off("notification")
socket.on("notification", (info) =>{
    console.log(info);
    toast.success("pinto");
})

export default socket
