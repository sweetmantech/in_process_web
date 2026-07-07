import { useState } from "react";

const useMediaEdit = () => {
  const [editActive, setEditActive] = useState(false);

  return {
    editActive,
    enterEditMode: () => setEditActive(true),
    exitEditMode: () => setEditActive(false),
  };
};

export default useMediaEdit;
