"use client";

import { useState } from "react";

const useMobileHeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, close };
};

export default useMobileHeaderMenu;
