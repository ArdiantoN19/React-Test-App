import { useState } from "react";

const useInputs = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const onChangeHandler = ({ target }) => {
    setInputs((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    if (inputs[target.name] === "") {
      setErrors((prev) => ({
        ...prev,
        [target.name]: `${target.name} is required`,
      }));
    }
  };

  return [inputs, errors, onChangeHandler];
};

export default useInputs;
