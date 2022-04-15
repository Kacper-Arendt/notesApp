import { useState, ChangeEvent } from 'react';

export const useField = <T>(initialState: T) => {
    const [fields, setFields] = useState(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        });
    };

    const reset = () => {
        setFields(initialState);
    };

    return {
        fields,
        setFields,
        reset,
        handleChange,
    };
};