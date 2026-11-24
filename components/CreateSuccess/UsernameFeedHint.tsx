import Link from "next/link";
import useShowUsernameHint from "@/hooks/useShowUsernameHint";

const UsernameFeedHint = () => {
  const showUsernameHint = useShowUsernameHint();

  if (!showUsernameHint) return null;

  return (
    <p className="mt-3 font-spectral-italic text-sm text-grey-moss-300">
      Your timeline always shows your moments. To also appear in the home feed,{" "}
      <Link href="/manage/account" className="underline">
        set a username
      </Link>
      .
    </p>
  );
};

export default UsernameFeedHint;
