import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { setTodos, addTodo, deleteTodo, toggleTodo, setDisplayedTodos, addDisplayedTodo, removeDisplayedTodo, completeDisplayedTodo, changeSelectedAction } from './features/todoSlice';
import './App.css';

interface Todos {
    id: number;
    name: string;
    completed: boolean;
}

function App() {
    const [inputValue, setInputValue] = useState('');
    const { todos } = useAppSelector(state => state.todos);
    const { displayedTodos } = useAppSelector(state => state.displayedTodos);
    const selectedAction = useAppSelector(state => state.selectedAction);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        if (!inputValue) {
            return;
        }

        const newTodo = { id: Date.now(), name: inputValue, completed: false };
        dispatch(addTodo(newTodo));
        dispatch(addDisplayedTodo(newTodo));
        setInputValue('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const completeTodo = (todo: Todos) => {
        dispatch(toggleTodo(todo));
        dispatch(completeDisplayedTodo(todo));
    };

    const removeTodo = (todo: Todos) => {
        dispatch(deleteTodo(todo));
        dispatch(removeDisplayedTodo(todo));
    };

    const filterTodos = (criteria: string) => {
        let newTodos = [...todos];

        if (criteria === 'completed') {
            newTodos = newTodos.filter(todo => todo.completed);
            dispatch(changeSelectedAction('completed'));
        } else if (criteria === 'active') {
            newTodos = newTodos.filter(todo => !todo.completed);
            dispatch(changeSelectedAction('active'));
        } else if (criteria === 'ClearCompleted') {
            newTodos = newTodos.filter(todo => !todo.completed);
            dispatch(changeSelectedAction('all'));
            dispatch(setTodos(newTodos));
        } else if (criteria === 'all') {
            dispatch(changeSelectedAction('all'));
        }

        dispatch(setDisplayedTodos(newTodos));
    };

    return (
        <main>
            <section id='hero'>
                <img className='hero__img' src="/bg-desktop-dark.jpg" alt="background" />
            </section>
            <section id='todo-section'>
                <div className='todo-section__content'>
                    <h1 className='todo-section__title'>Todo</h1>
                    <input type="text"
                        className='todo-section__input'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={inputValue}
                        placeholder='Create a new todo...'
                    />
                    <ul className='todo-section__list' role='list'>
                        {displayedTodos.length > 0 ? displayedTodos.map(todo => {
                            return (
                                <li className='todo-section__list-item' key={todo.id}>
                                    <button className='todo-section__change-status btn' onClick={() => completeTodo(todo)}><img src="/icon-check.svg" alt="check" /></button>
                                    <span className={`todo-section__todo-name ${todo.completed ? 'completed' : ''}`}>
                                        {todo.name}
                                    </span>
                                    <button className='todo-section__remove-todo btn' onClick={() => removeTodo(todo)}><img src="/icon-cross.svg" alt="cross" />
                                    </button>
                                </li>
                            );
                        }) :
                            null
                        }
                    </ul>

                    <span className='todo-section__items-left'>{todos.filter(todo => !todo.completed).length} items left</span>

                    <div className='todo-section__actions'>
                        <button className={`todo-section__buttons btn ${selectedAction === 'all' ? 'selected-action' : ''}`} onClick={() => filterTodos('all')}>All</button>
                        <button className={`todo-section__buttons btn ${selectedAction === 'active' ? 'selected-action' : ''}`} onClick={() => filterTodos('active')}>Active</button>
                        <button className={`todo-section__buttons btn ${selectedAction === 'completed' ? 'selected-action' : ''}`} onClick={() => filterTodos('completed')}>Completed</button>
                        <button className='todo-section__buttons btn' onClick={() => filterTodos('ClearCompleted')}>Clear Completed</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default App;
