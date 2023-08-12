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
        } else if (criteria === 'active') {
            newTodos = newTodos.filter(todo => !todo.completed);
        } else if (criteria === 'ClearCompleted') {
            newTodos = newTodos.filter(todo => !todo.completed);
            setTodos(newTodos);
        }

        if (newTodos.length < 1) {
            return;
        }

        setDisplayedTodos(newTodos);
    };

    return (
        <main>
            <section>
                <img src="" alt="" />
            </section>
            <section>
                <div>
                    <h1>Todo</h1>
                    <input type="text"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={inputValue}
                    />
                    <ul>
                        {displayedTodos.map((todo, index) => {
                            return (
                                <li key={index} style={{ color: todo.completed ? 'red' : 'black' }}>
                                    <button onClick={() => completeTodo(index)}>{todo.completed ? 'uncomplete' : 'complete'}</button>
                                    {todo.name}
                                    <button onClick={() => removeTodo(index)}>trash</button>
                                </li>
                            );
                        })}
                    </ul>
                    <div>
                        <span>{todos.filter(todo => !todo.completed).length} items left</span>
                        <button onClick={() => filterTodos('all')}>All</button>
                        <button onClick={() => filterTodos('active')}>Active</button>
                        <button onClick={() => filterTodos('completed')}>Completed</button>
                        <button onClick={() => filterTodos('ClearCompleted')}>Clear Completed</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default App;
