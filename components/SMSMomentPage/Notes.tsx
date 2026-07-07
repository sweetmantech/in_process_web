import { Fragment } from "react";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import Note from "./Note";
import SignInButton from "./SignInButton";

const Notes = () => {
  const { primaryWallet } = useWalletsProvider();
  const { isOwner } = useMomentProvider();

  if (primaryWallet && !isOwner) return <Note>You are not an admin of this moment.</Note>;

  if (primaryWallet) return <Fragment />;

  return (
    <>
      <Note>Sign in to airdrop and edit the moment.</Note>
      <SignInButton />
    </>
  );
};

export default Notes;
