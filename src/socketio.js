import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { addNotification } from './Functions/Req';


export default function iniciarWebSocket(company) {
  console.log("Carregou WebSocket");
  const URL = `http://localhost:8080/?company=${company}`
  
  const socket = new io(URL, {
      extraHeaders: {
          authorization: Cookies.get("token")
      },
      reconnectionAttempts: 1
  })
  
  socket.off("notification")
  socket.on("notification", (info) =>{
      console.log(info);
      toast.success(`${info.notificationOrigin.petBirth}`, {
          position: 'top-right'
      });
      
  })
  
  socket.off("notificationStatus")
  socket.on("notificationStatus", (info) =>{
      console.log(info);
      toast.success(`${info.notificationDescription}`, {
          position: 'top-right'
      });
      
  })
}
