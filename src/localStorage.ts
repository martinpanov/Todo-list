export function loadState() {
    const localStorageData = localStorage.getItem('todos');

    if (localStorageData) {
        return JSON.parse(localStorageData);
    }
}

export function saveState(state: any) {
    localStorage.setItem('todos', JSON.stringify(state));
}