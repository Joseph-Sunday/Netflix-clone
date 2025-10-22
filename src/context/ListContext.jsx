import { createContext, useContext, useState, useEffect } from "react";

const ListContext = createContext();

export function ListProvider({ children }) {
  const [myList, setMyList] = useState([]);

  // Load saved lists to local storage
  useEffect(() => {
    const savedList = localStorage.getItem("myList");
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, []);

  // Save list to. local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  // Add to list
  const addToList = (movie) => {
    setMyList((prev) => {
      if (prev.find((item) => item.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  // Remove from List
  const removeFromList = (id) => {
    setMyList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ListContext.Provider value={{ myList, addToList, removeFromList }}>
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  return useContext(ListContext);
}
