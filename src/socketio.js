import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const URL = "http://localhost:8080/"

const socket = new io(URL, {
    extraHeaders: {
        authorization: Cookies.get("token"),
        company: Cookies.get("company")
    }
})

//socket.on("notification", (info) => console.log(info))

export default socket
