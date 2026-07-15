"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

interface ConnectButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "pill" | "row";
}

const ConnectButton = forwardRef<HTMLButtonElement, ConnectButtonProps>(
  ({ variant = "pill", ...props }, ref) => {
    if (variant === "row") {
      return (
        <button
          ref={ref}
          type="button"
          {...props}
          className="rounded-full border border-grey-moss-100 bg-white px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-grey-moss-900 hover:border-grey-moss-300"
        >
          Connect
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
      >
        connect email
      </button>
    );
  }
);

export default ConnectButton;
