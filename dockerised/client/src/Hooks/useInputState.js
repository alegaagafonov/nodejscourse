import { useState } from "react";

function useInputState(initalVal = "") {
  const [value, setValue] = useState(initalVal);

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [value, handleChange, reset];
}

export default useInputState;
