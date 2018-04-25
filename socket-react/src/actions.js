import axios from 'axios';

export const types = {
    GET_MESSAGES_START: "GET_MESSAGES_START",
    GET_MESSAGES_END: "GET_MESSAGES_END",
    GET_MESSAGES_ERROR: "GET_MESSAGES_ERROR",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
    NEW_CONNECTION: "NEW_CONNECTION",
    DISCONNECT: "DISCONNECT"
};

export const getMessages = () => {
    return function (dispatch) {
        dispatch({
            type: types.GET_MESSAGES_START
        });

        axios.get("http://localhost:7777/")
            .then(res => {
                dispatch({
                    type: types.GET_MESSAGES_END,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: types.GET_MESSAGES_ERROR,
                    payload: err.data
                })
            })
    };  
};

export const sendMessage = (message) => {
    return (dispatch) => {
        axios.post("http://localhost:7777/", {
            name: "bob",
            message: message
        })
    }
}
export const receiveMessage = (message) => {
    return (dispatch) => {
        dispatch({
            type: types.RECEIVE_MESSAGE,
            payload: message
        })
    }
}
export const newConnection = (user) => {
    return (dispatch) => {
        dispatch({
            type: types.NEW_CONNECTION,
            payload: user
        })
    }
}
export const disconnect = () => {
    return (dispatch) => {
        dispatch({
            type: types.DISCONNECT
        })
    }
}