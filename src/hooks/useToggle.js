import { useLocalStorage } from "../hooks";

const useToggle = (key, initialValue) => {
    const [value, setValue] = useLocalStorage(key, initialValue);

    const toggle = (value) => {
        setValue(prevState => typeof value === "boolean" ? value : !prevState);
    };

    return [value, toggle];
};

export default useToggle;