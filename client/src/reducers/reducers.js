import { CURRENT_USER, ONLINE_USERS } from "../actions/actions";


export default function Reducer(state = { onlineUsers: [] }, action) {
    switch (action.type) {
        case CURRENT_USER:
            return { ...state, user: action.payload }
        case ONLINE_USERS:
            return { ...state, onlineUsers: action.payload }
        default:
            return state
    }
}