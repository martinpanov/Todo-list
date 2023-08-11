import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './App.css';

interface Todos {
    name: string,
    completed: boolean;
}

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todos[]>([]);
    const [displayedTodos, setDisplayedTodos] = useState<Todos[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        setTodos(prevState => [...prevState, { name: inputValue, completed: false }]);
        setDisplayedTodos(prevState => [...prevState, { name: inputValue, completed: false }]);
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
    };

    const removeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        setDisplayedTodos(newTodos);
    };

    const filterByCompleted = () => {
        const newTodos = [...todos].filter(todo => todo.completed);

        if (newTodos.length < 1) {
            return;
        }

        setDisplayedTodos(newTodos);
    };

    const filterByAll = () => {
        setDisplayedTodos([...todos]);
    };

    const filterByActive = () => {
        const newTodos = [...todos].filter(todo => !todo.completed);

        if (newTodos.length < 1) {
            return;
        }

        setDisplayedTodos(newTodos);
    };

    const deleteCompleted = () => {
        const newTodos = [...todos].filter(todo => !todo.completed);
        setTodos(newTodos);
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
                        <span>5 items left</span>
                        <button onClick={() => filterByAll()}>All</button>
                        <button onClick={() => filterByActive()}>Active</button>
                        <button onClick={() => filterByCompleted()}>Completed</button>
                        <button onClick={() => deleteCompleted()}>Clear Completed</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default App;
