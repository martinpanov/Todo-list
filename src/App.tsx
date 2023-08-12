import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './App.css';

interface Todos {
    name: string,
    completed: boolean;
}

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todos[]>([]);
    const [displayedTodos, setDisplayedTodos] = useState<Todos[]>([]);
    const [selectedAction, setSelectedAction] = useState('all');

    useEffect(() => {
        const localStorageData = localStorage.getItem('todos');
        if (localStorageData) {
            setTodos(JSON.parse(localStorageData));
            setDisplayedTodos(JSON.parse(localStorageData));
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        const newTodos = [...todos, { name: inputValue, completed: false }];
        setTodos(newTodos);
        setDisplayedTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setInputValue('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const completeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
        setDisplayedTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const removeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        setDisplayedTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const filterTodos = (criteria: string) => {
        let newTodos = [...todos];

        if (criteria === 'completed') {
            newTodos = newTodos.filter(todo => todo.completed);
            setSelectedAction('completed');
        } else if (criteria === 'active') {
            newTodos = newTodos.filter(todo => !todo.completed);
            setSelectedAction('active');
        } else if (criteria === 'ClearCompleted') {
            newTodos = newTodos.filter(todo => !todo.completed);
            setTodos(newTodos);
        } else if (criteria === 'all') {
            setSelectedAction('all');
        }

        if (newTodos.length < 1) {
            return;
        }

        setDisplayedTodos(newTodos);
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
                        {displayedTodos.map((todo, index) => {
                            return (
                                <li className='todo-section__list-item' key={index}>
                                    <button className='todo-section__change-status btn' onClick={() => completeTodo(index)}><img src="/icon-check.svg" alt="check" /></button>
                                    <span className={`todo-section__todo-name ${todo.completed ? 'completed' : ''}`}>
                                        {todo.name}
                                    </span>
                                    <button className='todo-section__remove-todo btn' onClick={() => removeTodo(index)}><img src="/icon-cross.svg" alt="cross" />
                                    </button>
                                </li>
                            );
                        })}
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
