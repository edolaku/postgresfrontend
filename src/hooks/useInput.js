import useLocalStorage from "./useLocalStorage";

const useInput = (key, initialValue) => {
    const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
    const reset = () => {
        setStoredValue(initialValue)
    }
    const attributeObj = {
        value: storedValue,
        onChange: e => setStoredValue(e.target.value),
    }
    return [storedValue, attributeObj, reset]
}

export default useInput