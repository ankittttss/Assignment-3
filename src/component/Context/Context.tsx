import React, { createContext, useState } from "react";

// Define the shape of the context value
type CounterContextType = {
    counter: number;
    increment: () => void;
    decrement: () => void;
}

// Create the context with a default value
export const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = (props: any) => {
    const [counter, setCounter] = useState(0);

    // Value to be passed to the provider
    const value: CounterContextType = {
        counter,
        increment: () => setCounter(counter + 1),
        decrement: () => setCounter(counter - 1),
    };

    return (
        <CounterContext.Provider value={value}>
            {props.children}
        </CounterContext.Provider>
    );
};
