import { createContext, useContext } from "react";
export const MediaContext = createContext({});

export const MediaProvider = MediaContext.Provider;

export default function useAllMedia() {
  return useContext(MediaContext);
}
