import { useEffect, useState } from "react";

const getValueFromLocalStorage = (key, initialValue) => {
    // if SSR like next.js
    if (typeof window == "undefined") return initialValue;

    //if a value is already store
    let localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    // return the result of a function
    if (initialValue instanceof Function) return initialValue();

    return initialValue;
};

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => getValueFromLocalStorage(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;