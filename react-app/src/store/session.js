// constants
// set === get
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_ALL_USERS = "session/SET_ALL_USERS"

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setUsers = (users) => ({
  type: SET_ALL_USERS,
  payload: users
});

const initialState = { user: null, allUsers: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getUserThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`, {
  });

  if (response.ok) {
    const data = await response.json()
    console.log('data from GetUserThunk', data.servers)
    dispatch(setUser(data));
    return data
  } else {
    throw response
  }
};

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/');

  if (!response.ok) {
    throw response
  }

  const data = await response.json();
  dispatch(setUsers(data.users));
  return data
}

export const addFriendThunk = (user_id, friend_id) => async (dispatch) => {
  const response = await fetch("/api/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      friend_id
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserThunk(user_id))
    return data
  }
  throw response
};

export const deleteFriendThunk = (user_id, friend_id) => async (dispatch) => {
  const response = await fetch(`/api/friends/${friend_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(getUserThunk(user_id))
    return data
  } else {
    throw response
  }
}

export default function reducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case SET_USER:
      console.log('this is the action payload', action.payload)
      return { ...newState, user: action.payload };
    case REMOVE_USER:
      return { ...newState, user: null };
    case SET_ALL_USERS:
      return { ...newState, allUsers: action.payload };
    default:
      return state;
  }
}
