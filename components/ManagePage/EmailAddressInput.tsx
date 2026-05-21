import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEmailVerificationProvider } from "@/providers/EmailVerificationProvider";

const EmailAddressInput = () => {
  const { email, setEmail, isLoading, handleSendCode } = useEmailVerificationProvider();

  return (
    <>
      <p className="text-grey-moss-600 mb-6 w-full text-center font-archivo text-sm italic">
        Enter your email address to receive a verification code
      </p>
      <fieldset className="w-full">
        <Label className="text-grey-moss-600 mb-1 w-full text-left font-archivo text-sm">
          email
        </Label>
        <Input
          type="email"
          placeholder="ex: artist@example.com"
          className="mt-1 resize-none font-spectral"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleSendCode}
          disabled={isLoading || !email.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "sending..." : "send code"}
        </button>
      </fieldset>
    </>
  );
};

export default EmailAddressInput;
