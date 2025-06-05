import { useState } from "react";
import clsx from "clsx";

export function EditableInput({ classname, initialText }) {
    const [text, setText] = useState(initialText || "Valor por defecto");
  
    return (
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={clsx("p-2 rounded-md w-full bg-purple-100 m-2")}
      />
    );
  }
  