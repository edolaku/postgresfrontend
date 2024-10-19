import { useState, useEffect } from "react";


const getLocalStorage = (key, initialValue) => {
    // SSR seperti di next.js
    if (typeof window === 'undefined') {
        return initialValue
    }

    // jika value dari local storage ada
    const localValue = localStorage.getItem(key)
    if (localValue) return JSON.parse(localValue)

    // return result dari function
    if (initialValue instanceof Function) {
        return initialValue()
    }

    return initialValue
}

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(JSON.parse(localStorage.getItem(key)) || initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;