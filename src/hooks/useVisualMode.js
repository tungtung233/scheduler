import { useEffect, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  useEffect(() => {
    setMode(history[history.length - 1]);
  }, [history]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => {
        const newPrev = [...prev];

        newPrev.pop();
        return newPrev;
      });
    }

    setHistory((prev) => [...prev, newMode]);
  };

  const back = () => {
    setHistory((prev) => {
      const newPrev = [...prev];

      newPrev.pop();
      return newPrev;
    });
  };

  return { mode, transition, back };
}
