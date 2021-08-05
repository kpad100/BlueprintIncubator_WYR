import { useState, useEffect, useRef } from "react";

const Typewriter = ({ text }) => {
  const index = useRef(0);

  const [currentText, setCurrentText] = useState("");

  //for animation

  useEffect(() => {
    if (index.current < text.length) {
      setTimeout(() => {
        setCurrentText((value) => value + text.charAt(index.current));
        index.current += 1;
      }, 200);
    }
  }, [currentText, text]);

  return <h1>{currentText} </h1>;
};

export default Typewriter;
