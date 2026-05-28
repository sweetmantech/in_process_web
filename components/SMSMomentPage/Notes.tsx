import { Fragment } from "react";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { LoginButton } from "../LoginButton/LoginButton";
import { useMomentProvider } from "@/providers/MomentProvider";
import Note from "./Note";

const Notes = () => {
  const { primaryWallet } = useWalletsProvider();
  const { isOwner } = useMomentProvider();

  if (primaryWallet && !isOwner) return <Note>you are not an admin of this moment.</Note>;

  if (primaryWallet) return <Fragment />;

  return (
    <>
      <Note>sign in to airdrop and edit the description.</Note>
      <LoginButton />
    </>
  );
};

export default Notes;
