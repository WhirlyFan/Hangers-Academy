
//types
const GET_ALL_SERVERS = 'servers/getAllServers'

//action creators
const getAllServers = (allServers) => {
    return {
        type: GET_ALL_SERVERS,
        payload: allServers
    }
}

//thunks
export const getAllServersThunk = () => async (dispatch) => {
    const response = await fetch("/api/servers", {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllServers(data));
    }
};

//reducer

const initialState = {
    allServers: {}
}

const serversReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_SERVERS:
            const allServersArr = action.payload.Servers
            allServersArr.forEach((server) => {
                newState.allServers[server.id] = server;
            })
            return newState
        default:
            return state

    }
}

export default serversReducer;
