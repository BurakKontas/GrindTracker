import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../hooks";

const initialState: { liste: string[] } = {
    liste: [],
};

export const settingsSlice = createAppSlice({
    name: "settings",
    initialState,
    selectors: {

    },
    reducers: (create) => ({
        test: create.reducer<string>((state, action) => {
            state.liste.push(action.payload);
        }),
        fetchTodo: create.asyncThunk(
            async (id: string, thunkApi) => {
                const res = await fetch(`myApi/todos?id=${id}`)
                return (await res.json()) as any
            },
            {
                pending: (state) => {
                    
                },
                rejected: (state, action) => {

                },
                fulfilled: (state, action) => {
                    
                },
            }
        ),
    }),
});

// Action creators are generated for each case reducer function
export const {  } = settingsSlice.actions;

export default settingsSlice.reducer;