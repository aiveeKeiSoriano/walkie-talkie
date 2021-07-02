import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAudio, initializeSocket } from "../actions/actions";


export default function Main() {

    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    let onlineUsers = useSelector(state => state.onlineUsers)

    useEffect(() => {
        dispatch(initializeSocket())
    }, [])

    useEffect(() => {
        console.log(onlineUsers, 'main.jsx')
    }, [onlineUsers])

    return (
        <div className="container">
            <h1>{user}</h1>
            <div className="online">
            <h3>Other online users:</h3>
                {onlineUsers.map(el => el.name !== user ? <li>{el.name}</li> : null)}
            </div>
            <button onClick={() => dispatch(getAudio())}>Call everybody</button>
        </div>
    )
}