import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

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
      if (prev.find((item) => item.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
    if (myList.find((item) => item.id === movie.id)) {
      toast("Already in My List");
    } else {
      toast.success(`Added: ${movie.title || movie.name}`);
    }
  };

  // Remove from List
  const removeFromList = (id) => {
    const removedMovie = myList.find((item) => item.id === id);
    toast.error(`Removed: ${removedMovie.title || removedMovie.name}`);
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
