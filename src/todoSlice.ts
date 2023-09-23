import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    name: string;
    completed: boolean;
}

interface TodosState {
    todos: Todo[];
}

interface DisplayedTodosState {
    displayedTodos: Todo[];
}

const initialTodosState: TodosState = {
    todos: [],
};

const displayedTodosState: DisplayedTodosState = {
    displayedTodos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialTodosState,
    reducers: {
        setTodos(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
        },
        addTodo(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload);
        },
        deleteTodo(state, action: PayloadAction<Todo>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        toggleTodo(state, action: PayloadAction<Todo>) {
            state.todos.forEach(todo => { if (todo.id === action.payload.id) todo.completed = !todo.completed; });
        }
    }
});

const displayedTodosSlice = createSlice({
    name: 'displayedTodos',
    initialState: displayedTodosState,
    reducers: {
        setDisplayedTodos(state, action: PayloadAction<Todo[]>) {
            state.displayedTodos = action.payload;
        },
        addDisplayedTodo(state, action: PayloadAction<Todo>) {
            state.displayedTodos.push(action.payload);
        },
        removeDisplayedTodo(state, action: PayloadAction<Todo>) {
            state.displayedTodos = state.displayedTodos.filter(todo => todo.id !== action.payload.id);
        },
        completeDisplayedTodo(state, action: PayloadAction<Todo>) {
            state.displayedTodos.forEach(todo => { if (todo.id === action.payload.id) todo.completed = !todo.completed; });
        }
    }
});

const selectedActionSlice = createSlice({
    name: 'selectedAction',
    initialState: 'all',
    reducers: {
        changeSelectedAction(_state, action) {
            return action.payload;
        }
    }
});

export const { setTodos, addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export const { setDisplayedTodos, addDisplayedTodo, removeDisplayedTodo, completeDisplayedTodo } = displayedTodosSlice.actions;
export const { changeSelectedAction } = selectedActionSlice.actions;

export default {
    todos: todoSlice.reducer,
    displayedTodos: displayedTodosSlice.reducer,
    selectedAction: selectedActionSlice.reducer,
};