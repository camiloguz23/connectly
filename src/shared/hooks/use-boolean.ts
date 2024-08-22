import { useState } from "react";

export const useBoolean = () => {
  const [value, setValue] = useState(false);
  const toggle = () => setValue((prev) => !prev);
  const onFalse = () => setValue(false);
  const onTrue = () => setValue(true);

  return { value, toggle, onTrue, onFalse };
};
