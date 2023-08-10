import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        setTodos(prevState => [...prevState, inputValue]);
        setInputValue('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const removeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
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
                        {todos.map((todo, index) => {
                            return (
                                <li key={index}>{todo} <button onClick={() => removeTodo(index)}>trash</button></li>
                            );
                        })}
                    </ul>
                    <div>
                        <span>5 items left</span>
                        <button>All</button>
                        <button>Active</button>
                        <button>Completed</button>
                        <button>Clear Completed</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default App;
