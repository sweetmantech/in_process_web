"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";
import { classNames } from "@/lib/classNames";

const ConnectButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<"button">>(
  (props, ref) => (
    <button ref={ref} type="button" {...props} className={classNames()}>
      Connect
    </button>
  )
);

export default ConnectButton;
