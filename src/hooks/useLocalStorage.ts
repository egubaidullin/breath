'use client';

import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = (value: T | ((val: T | undefined) => T)) => void;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue]);


  const setValue: SetValue<T> = useCallback(value => {
     setStoredValue(prevValue => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        }
        return valueToStore;
    });
  }, [key]);


  // Return a 2-element array, like useState.
  // The first element is the current value.
  // The second element is a function to update the value.
  // This function handles both setting a new value and updating based on the previous value.
  return [storedValue, setValue];
}

export default useLocalStorage;
