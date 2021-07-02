
import { io } from "socket.io-client";
const SERVER = "ws://localhost:3333"
const socket = io(SERVER);

export const CURRENT_USER = 'CURRENT_USER'
export const ONLINE_USERS = 'ONLINE_USER'

export const currentUser = (name) => ({
    type: CURRENT_USER,
    payload: name
})

export const onlineUsers = (users) => ({
    type: ONLINE_USERS,
    payload: users
})

export const initializeSocket = () => {
    return (dispatch) => {

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on("users", (data) => {
            console.log(data)
            dispatch(onlineUsers(data))
        })

        socket.on("stream", (stream) => {
            console.log(stream, "received")
            var blob = new Blob([stream], {
                type: "audio/wav"
              });
            let audio = new Audio()
            audio.src = window.URL.createObjectURL(blob);
            audio.play()
        })

        let name = prompt("Enter your name")
        socket.emit("name", name)
        dispatch(currentUser(name))
    }
}

export const getAudio = () => {
    return async () => {

        try {
            let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            let mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.start();
            function handleDataAvailable(event) {
                console.log("data-available");
                if (event.data.size > 0) {
                    socket.emit("stream", event.data)
                }
            }
            let call = setInterval(() => {
                mediaRecorder.stop();
                mediaRecorder.start()
            }, 2000)
        setTimeout(() => clearInterval(call), 30000)
        }

        catch (err) {
            console.log(err)
          }
        }
    }
