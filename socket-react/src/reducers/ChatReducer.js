import { types } from '../actions';

export const initialState = {
    data: [],
    loading: false,
    loaded: false,
    error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MESSAGES_START: return {
        ...state,
        loading: true,
        loaded: false,
        error: null
    }
    case types.GET_MESSAGES_END: return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
    }
    case types.GET_MESSAGES_ERROR: return {
        ...state,
        error: action.payload,
        loading: false
    }
    case types.RECEIVE_MESSAGE: return {
        data: state.data.concat(action.payload)
    }
    case types.NEW_CONNECTION: return {
        data: state.data.concat({
            message: "new connection"
        })
    }
    case types.DISCONNECT: return {
        data: state.data.concat({
            message: "someone disconnected"
        })
    }
    default: return state;
  }
};
