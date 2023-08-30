import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { loginUser, registerUser } from './authReducer'

// Define a type for the slice state
interface authState {
  value: number,
  userInfo?: Object,
  userDetails?: Object,
  users?: [],
  token?: string,
  registerisLoading?: Boolean,
  registerisSuccess?: Boolean,
  registerisError?: Boolean,

  loginisLoading?: Boolean,
  loginisSuccess?: Boolean,
  loginisError?: Boolean,
}

// Define the initial state using that type
const initialState: authState = {
  value: 0,
  userInfo: '',
  users: [],
  token: "",

  registerisLoading: false,
  registerisSuccess: false,
  registerisError: false,

  loginisLoading: false,
  loginisSuccess: false,
  loginisError: false,

}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    // registration build case
    builder.addCase(registerUser.pending, (state, action) => {
      state.registerisLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerisSuccess = true
      state.registerisLoading = false
      state.userDetails = action.payload
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerisSuccess = false
      state.registerisError = true
      state.registerisLoading = false
    })

    // registration build case
    builder.addCase(loginUser.pending, (state, action) => {
      state.registerisLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.registerisSuccess = true
      state.registerisLoading = false
      state.userDetails = action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.registerisSuccess = false
      state.registerisError = true
      state.registerisLoading = false
    })
  },
})

export const { increment, decrement, incrementByAmount } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value

export default authSlice.reducer