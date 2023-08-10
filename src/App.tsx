import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './App.css';

interface Todos {
    name: string,
    completed: boolean;
}

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todos[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        setTodos(prevState => [...prevState, { name: inputValue, completed: false }]);
        setInputValue('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const completeTodo = (index: number) => {
        const newTodos = [...todos];
        console.log(!newTodos[index].completed);
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
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
                                <li key={index} style={{ color: todo.completed ? 'red' : 'black' }}>
                                    <button onClick={() => completeTodo(index)}>complete</button>
                                    {todo.name}
                                    <button onClick={() => removeTodo(index)}>trash</button>
                                </li>
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
