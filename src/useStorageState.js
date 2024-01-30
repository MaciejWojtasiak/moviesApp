import { useState, useEffect } from "react"

const useStorageState = (key, initialState) => {
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem(key);
        return JSON.parse(storedValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue]
}