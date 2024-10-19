import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialValue) => {
    const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
    const toggle = () => {
        setStoredValue(prev => {
            return typeof prev === 'boolean' ? !prev : true
        })
    }

    return [storedValue, toggle]
}

export default useToggle