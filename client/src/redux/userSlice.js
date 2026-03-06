import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData: null,
        darkMode: false
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        },
        toggleDarkMode:(state)=>{
            state.darkMode = !state.darkMode
        },
        setDarkMode:(state, action)=>{
            state.darkMode = action.payload
        }
    }
})

export const {setUserData, toggleDarkMode, setDarkMode} = userSlice.actions

export default userSlice.reducer
