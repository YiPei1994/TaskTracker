import { parseISO } from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const TaskTrackerContext = createContext();

function TaskTrackerContextProvider({ children }) {
  const [myLocalStorage, setMyLocalStorage] = useLocalStorageState("tasks", "");
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState();

  useEffect(() => {
    const storedState = localStorage.getItem("tasks");
    if (storedState) {
      setMyLocalStorage(JSON.parse(storedState));
      setTasks(JSON.parse(storedState));
    }
  }, [setMyLocalStorage, setTasks]);
  function handleDelete(id) {
    const afterDeleteTasks = tasks.filter((task) => task.id !== id);
    handleChange(afterDeleteTasks);
  }
  function handleStatus(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );

    handleChange(updatedTasks);
  }

  function handleShow() {
    setShow((show) => !show);
  }
  function handleAdd(newTask) {
    if (!newTask) return;
    handleChange([...tasks, newTask]);
  }
  function handleSort(direction) {
    if (!direction) return;

    const sortedTasks = [...tasks];

    if (direction === "asc") {
      sortedTasks.sort((a, b) => a.status - b.status);
    } else if (direction === "desc") {
      sortedTasks.sort((a, b) => b.status - a.status);
    } else if (direction === "dateAsc") {
      sortedTasks.sort((a, b) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);

        return dateA - dateB;
      });
    } else if (direction === "dateDesc") {
      sortedTasks.sort((a, b) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);

        return dateB - dateA;
      });
    }

    handleChange(sortedTasks);
  }

  const handleChange = (newValue) => {
    setTasks(newValue);
    localStorage.setItem("tasks", JSON.stringify(newValue));
  };
  return (
    <TaskTrackerContext.Provider
      value={{
        tasks,
        handleDelete,
        handleStatus,
        show,
        handleShow,
        handleAdd,
        handleSort,
      }}
    >
      {children}
    </TaskTrackerContext.Provider>
  );
}

function useTracker() {
  const context = useContext(TaskTrackerContext);

  return context;
}

export { TaskTrackerContextProvider, useTracker };
