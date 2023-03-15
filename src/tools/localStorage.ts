import { TodoItem } from "../components/TodoForm/TodoForm";

function saveToLocalStorage(key: string, value: TodoItem[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return null;
  }
}

function getFromLocalStorage(key: string, defaultValue?: any) {
  const reference = localStorage.getItem(key);
  if (!reference) return defaultValue;
  try {
    return JSON.parse(reference) ?? defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export { getFromLocalStorage, saveToLocalStorage };
