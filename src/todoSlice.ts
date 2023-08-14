import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todos {
    id: number;
    name: string;
    completed: boolean;
}

interface TodosState {
    todos: Todos[];
}

const initialTodosState: TodosState = {
    todos: [],
};

const displayedTodosState: TodosState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialTodosState,
    reducers: {
        setTodos(state, action: PayloadAction<Todos[]>) {
            state.todos = action.payload;
        },
        addTodo(state, action: PayloadAction<Todos>) {
            state.todos.push(action.payload);
        },
        deleteTodo(state, action: PayloadAction<Todos>) {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos.splice(index, 1);
        },
        toggleTodo(state, action: PayloadAction<Todos>) {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[index].completed = !state.todos[index].completed;
        }
    }
});

const displayedTodosSlice = createSlice({
    name: 'displayedTodos',
    initialState: displayedTodosState,
    reducers: {
        setDisplayedTodos(state, action: PayloadAction<Todos[]>) {
            state.todos = action.payload;
        },
        addDisplayedTodos(state, action: PayloadAction<Todos>) {
            state.todos.push(action.payload);
        },
        removeDisplayedTodos(state, action: PayloadAction<Todos>) {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos.splice(index, 1);
        },
        completeDisplayedTodos(state, action: PayloadAction<Todos>) {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[index].completed = !state.todos[index].completed;
        }
    }
});

const selectedActionSlice = createSlice({
    name: 'selectedAction',
    initialState: 'all',
    reducers: {
        changeSelectedAction(_state, action: PayloadAction<string>) {
            return action.payload;
        }
    }
});

export const { setTodos, addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export const { setDisplayedTodos, addDisplayedTodos, removeDisplayedTodos, completeDisplayedTodos } = displayedTodosSlice.actions;
export const { changeSelectedAction } = selectedActionSlice.actions;

export default {
    todos: todoSlice.reducer,
    displayedTodos: displayedTodosSlice.reducer,
    selectedAction: selectedActionSlice.reducer,
};