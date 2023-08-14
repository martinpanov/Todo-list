import { configureStore } from "@reduxjs/toolkit";
import reducers from "./todoSlice";

export const store = configureStore({
    reducer: {
        todos: reducers.todos,
        displayedTodos: reducers.displayedTodos,
        selectedAction: reducers.selectedAction
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;