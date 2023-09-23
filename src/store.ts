import { configureStore } from "@reduxjs/toolkit";
import reducers from "./todoSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
    reducer: {
        todos: reducers.todos,
        displayedTodos: reducers.displayedTodos,
        selectedAction: reducers.selectedAction
    },
    preloadedState: persistedState
});

store.subscribe(() => {
    saveState(store.getState());
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;