import { createContext, useContext } from "react";

export const statesContext = createContext({
  todos: [
    {
      id: 1,
      task: " Todo msg",
      date: "",
      time: "",
      completed: false,
    },
  ],

  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
  HistoryTaker: (todo) => {},
});

export const StatesProvider = statesContext.Provider;

export default function useAllStates() {
  return useContext(statesContext);
}
