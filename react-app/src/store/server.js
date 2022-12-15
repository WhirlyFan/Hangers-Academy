import { getUserThunk } from "./session";

//normalize
export const normalize = (arr) => {
    const dataObj = {};
    arr.forEach(obj => dataObj[obj.id] = obj)
    return dataObj;
};

//types
const GET_ALL_SERVERS = 'servers/getAllServers';

//action creators
const getAllServers = (payload) => {
    return {
        type: GET_ALL_SERVERS,
        payload
    }
};

//thunks
export const getAllServersThunk = () => async (dispatch) => {
    const response = await fetch("/api/servers");

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllServers(data));
        return data
    } else {
        throw response
    }
};

export const postServerThunk = (server, userId = false) => async (dispatch) => {
    const response = await fetch("/api/servers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(server)
    });

    if (response.ok) {
        const data = await response.json()
        if (data.private === true) {
            const channel = await dispatch(postServerChannelThunk({ server_id: data.id, name: "general" }))
            dispatch(getUserThunk(data.owner_id))
            dispatch(postServerMemberThunk(data.id, userId))
            return { server: data, channel }
        }
        if (data.private === false) {
            const channel = await dispatch(postServerChannelThunk({ server_id: data.id, name: "general" }))
            dispatch(getUserThunk(data.owner_id))
            return { server: data, channel }
        }
        dispatch(getAllServersThunk())
        return data
    } else {
        const data = await response.json()
        return data
    }
}

export const postServerMemberThunk = (serverId, userId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: userId })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllServersThunk())
        return data
    } else {
        throw response
    }
}

export const postServerChannelThunk = (input, userId) => async (dispatch) => {
    const { server_id, name } = input
    const response = await fetch('/api/channels', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            server_id,
            name
        })
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllServersThunk())
        return data
    } else {
        return response
    }
}

export const editServerThunk = (server, id, userId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(server),
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllServersThunk())
        dispatch(getUserThunk(userId))
        return data
    } else {
        throw response
    }
}

export const editServerChannelThunk = (input) => async (dispatch) => {
    const { channel_id, name } = input
    const response = await fetch(`/api/channels/${channel_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllServersThunk())
        return data
    } else {
        return response
    }
}

export const deleteServerThunk = (serverId, userId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllServersThunk())
        dispatch(getUserThunk(userId))
        return data
    } else {
        throw response
    }
}

export const deleteServerChannelThunk = (channel_id) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channel_id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllServersThunk())
        return data
    } else {
        throw response
    }
}

//reducer

const initialState = {
    allServers: {}
}

const serversReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_SERVERS:
            const allServersObj = normalize(action.payload.Servers)
            newState = { ...state, allServers: allServersObj }
            return newState
        default:
            return state;
    }
}

export default serversReducer;
