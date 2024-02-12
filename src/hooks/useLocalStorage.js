import { useState } from "react";

export function useLocalStorage(key, initialTasks) {
    const [storedTasks, setStoredTasks] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialTasks
        } catch (error) {
            return initialTasks
        }
    })

    function setTasks(value) {
        try {
            setStoredTasks(value)
            window.localStorage.setItem(
                key,
                JSON.stringify(value)
            )
        } catch (error) {
            console.error(error);
        }
    }

    return [storedTasks, setTasks]
}