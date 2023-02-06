import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login } from './loginAPI';

export interface loginState {
  value: number;
  logged:boolean;
  access:string
  status: 'idle' | 'loading' | 'failed';
}

const initialState: loginState = {
  value: 0,
  status: 'idle',
  logged: false,
  access: ''
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (cred :any) => {
    const response = await login(cred);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout:(state)=>{
      state.logged = false
      state.access=""
    }
   
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state,action) => {
        console.log(action.payload.access)
        state.access=action.payload.access
        state.logged = true
        state.status = 'failed';
      });
  },
});

export const {logout} = loginSlice.actions;
export const selectAccess = (state: RootState) => state.login.access;
export const selectLogged = (state: RootState) => state.login.logged;
export default loginSlice.reducer;
