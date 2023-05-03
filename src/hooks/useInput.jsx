import { useState } from "react";

const useInput = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);

  const onChangeHandler = ({ target }) => {
    setValue(target.value);
  };
  return [value, onChangeHandler];
};

export default useInput;
