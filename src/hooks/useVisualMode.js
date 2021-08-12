import { useEffect, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //ensures that the state is updated every time a new visual mode has been selected
  //when transition() gets called, setHistory gets modified, which modifies history. This useEffect will update setMode -> mode every time history gets updated.
  useEffect(() => {
    setMode(history[history.length - 1]);
  }, [history]);

  const transition = (newMode, replace = false) => {
    //replace=true means that the last visual mode gets removed from the 'history'
    if (replace) {
      setHistory((prev) => {
        const newPrev = [...prev];

        newPrev.pop();
        return newPrev;
      });
    }

    //adds the new visual mode to the 'history'
    setHistory((prev) => [...prev, newMode]);
  };

  //ensures that when a user wants to go 'back' (e.g. cancelling or pressing X), they are brought back to the previous visual mode
  const back = () => {
    setHistory((prev) => {
      const newPrev = [...prev];

      newPrev.pop();
      return newPrev;
    });
  };

  return { mode, transition, back };
}
