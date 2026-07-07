"use client";

import { usePrivy } from "@privy-io/react-auth";

const SignInButton = () => {
  const { login, ready } = usePrivy();

  if (!ready) return null;

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={login}
        className="w-fit rounded-full bg-grey-moss-900 px-5 py-1.5 font-archivo text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Sign in
      </button>
    </div>
  );
};

export default SignInButton;
