import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEmailVerificationProvider } from "@/providers/EmailVerificationProvider";

const EmailCodeInput = () => {
  const { email, code, setCode, isLoading, handleVerifyCode } = useEmailVerificationProvider();

  return (
    <>
      <p className="text-grey-moss-600 mb-6 w-full text-center font-archivo text-sm italic">
        We sent a verification code to <span className="font-semibold not-italic">{email}</span>
      </p>
      <fieldset className="w-full">
        <Label className="text-grey-moss-600 mb-1 w-full text-left font-archivo text-sm">
          verification code
        </Label>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="6-digit code"
          maxLength={6}
          className="mt-1 resize-none font-spectral tracking-widest"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleVerifyCode}
          disabled={isLoading || code.length !== 6}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "verifying..." : "verify"}
        </button>
      </fieldset>
    </>
  );
};

export default EmailCodeInput;
