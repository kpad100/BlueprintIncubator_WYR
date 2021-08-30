import { useState, useEffect, useRef } from "react";

const Typewriter = ({ text }) => {
  const index = useRef(0);

  const [currentText, setCurrentText] = useState("");

  //for animation

  useEffect(() => {
    if (index.current < text.length) {
      let timerId = setTimeout(() => {
        setCurrentText((value) => value + text.charAt(index.current));
        index.current += 1;
      }, 200);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [currentText, text]);

  return <h1>{currentText} </h1>;
};

export default Typewriter;
