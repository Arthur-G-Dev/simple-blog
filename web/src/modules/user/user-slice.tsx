import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";
import {ApiInstance} from "../../services/api";
import {InitialState, User} from "./interfaces";

const initialState: InitialState = {
  user: {
    email: '',
    nick_name: '',
    password: ''
  },
  userLogged: false
}

const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.user = action.payload.user || action.payload
      state.userLogged = true
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token)
      }
      return state
    },
    logout: (state) => {
      state.userLogged = false
      localStorage.removeItem('token')
      return state
    }
  }
});

export const {
  setUser,
  logout
} = user.actions;

export const getUser = () => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.user.get()
      dispatch(setUser(res))
      return res;
    } catch (e) {
      console.warn("ERR", e)
    }
  }
};

export const signUp = (data: User) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.user.post('', data)
      console.log("SIGN", res)
      dispatch(setUser(res))
      return res;
    } catch (e) {
      console.warn("ERR", e)
    }
  }
};

export const login = (data: User) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.user.post('/login', data)
      dispatch(setUser(res))
      return res;
    } catch (e) {
      console.warn("ERR", e)
      return e.data.error
    }
  }
};

export const updateUser = (data: User) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.user.put('', data)
      console.log("RE", res)
      dispatch(setUser(res))
      return res;
    } catch (e) {
      console.warn("ERR", e)
    }
  }
}


export default user.reducer;
