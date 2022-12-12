// Action Types

const GET_CHANNEL_MESSAGES = "channels/getChannelMessages"
// const CREATE_CHANNEL = "channels/createChannel"
// const DELETE_CHANNEL = "channels/deleteChannel"
// const UPDATE_CHANNEL = "channels/updateChannel"

// Action Creators
export const getChannelMessages = (payload) => {
    return {
        type: GET_CHANNEL_MESSAGES,
        payload
    }
};

// export const createChannelMessage = (payload) => {
//     return {
//         type: CREATE_CHANNEL,
//         payload
//     }
// }

// export const deleteChannelMessage = (payload) => {
//     return {
//         type: DELETE_CHANNEL,
//         payload
//     }
// }

// export const updateChannelMessage = (payload) => {
//     return {
//         type: UPDATE_CHANNEL,
//         payload
//     }
// }

// Thunks
export const getChannelMessagesThunk = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getChannelMessages(data))
    } else {
        throw response;
    }

    return response
}

export const createChannelMessageThunk = (input) => async (dispatch) => {
    const { channel_id, user_id, message_content } = input
    const response = await fetch("/api/messages", {
        method: 'POST',
        body: JSON.stringify({
            channel_id,
            user_id,
            message_content
        })
    });

    if (!response.ok) {
        throw response;
    }

    return response
}

export const deleteChannelMessageThunk = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw response;
    }

    return response
}

export const updateChannelMessageThunk = (input) => async (dispatch) => {
    const { messageId, message_content } = input
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'PUT',
        body: JSON.stringify({
            message_content
        })
    })

    if (!response.ok) {
        throw response
    }
}

// Reducer
const initialState = {
    channelMessages: []
}

export const channelMessagesReducer = (state=initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_CHANNEL_MESSAGES:
            const { Messages } = action.payload
            newState = { ...newState, ...Messages }
            return newState
        default:
            return state
    }
}

export default channelMessagesReducer;
