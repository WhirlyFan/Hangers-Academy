//normalize
const normalize = (arr) => {
    const dataObj = {};
    arr.forEach(obj => dataObj[obj.id] = obj)
    return dataObj;
};

//types
const GET_ALL_SERVERS = 'servers/getAllServers';
const GET_CURRENT_SERVERS = 'servers/getCurrentServers'

//action creators
const getAllServers = (payload) => {
    return {
        type: GET_ALL_SERVERS,
        payload
    }
};

const getCurrentServers = (payload) => {
    return {
        type: GET_CURRENT_SERVERS,
        payload
    }
}

//thunks
export const getAllServersThunk = () => async (dispatch) => {
    const response = await fetch("/api/servers");

    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        dispatch(getAllServers(data));
    }
};

export const getCurrentServersThunk = () => async (dispatch) => {
    const response = await fetch("/api/servers/current");

    if (response.ok) {
        const data = await response.json();
        dispatch(getCurrentServers(data))
    }
}

//reducer

const initialState = {
    allServers: {},
    currentServers: {}
}

const serversReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_SERVERS:
            const allServersObj = normalize(action.payload.Servers)
            newState = {...state, allServers: allServersObj}
            return newState
        case GET_CURRENT_SERVERS:
            const currentServersObj = normalize(action.payload.Servers)
            newState = {...state, currentServers: currentServersObj}
            return newState
        default:
            return state;
    }
}

export default serversReducer;
