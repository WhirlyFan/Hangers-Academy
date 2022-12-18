// ACTION TYPES

const GET_CHANNEL_MESSAGES = "channels/getChannelMessages";

// Action Creators
export const getChannelMessages = (payload) => {
  return {
    type: GET_CHANNEL_MESSAGES,
    payload,
  };
};

// THUNKS
export const getChannelMessagesThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/messages`);

  if (!response.ok) {
    throw response;
  }
  const data = await response.json();
  dispatch(getChannelMessages(data));
  return data;
};

export const createChannelMessageThunk = (input) => async (dispatch) => {
  const { channelId, messageContent } = input;
  const response = await fetch("/api/messages", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      channel_id: channelId,
      message_content: messageContent,
    }),
  });

  if (!response.ok) {
    throw response;
  }
  const data = response.json();
  dispatch(getChannelMessagesThunk(channelId));
  return data;
};

export const deleteChannelMessageThunk =
  (messageId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw response;
    }
    const data = response.json();
    dispatch(getChannelMessagesThunk(channelId));
    return data;
  };

export const updateChannelMessageThunk = (input) => async (dispatch) => {
  const { messageId, messageContent, channelId } = input;
  const response = await fetch(`/api/messages/${messageId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      message_content: messageContent,
    }),
  });

  if (!response.ok) {
    throw response;
  }
  const data = response.json();
  dispatch(getChannelMessagesThunk(channelId));
  return data;
};

// REDUCER
const initialState = {};

export const channelMessagesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_CHANNEL_MESSAGES:
      const { Messages } = action.payload;
      if (Messages.length < 1) {
        newState = {};
        return newState;
      }
      newState = { ...newState, ...Messages };
      return newState;
    default:
      return state;
  }
};

export default channelMessagesReducer;
