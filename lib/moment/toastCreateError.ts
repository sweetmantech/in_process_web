import { toast } from "sonner";
import CreatePendingError from "./CreatePendingError";

interface ToastCreateErrorParams {
  error: unknown;
  pendingMessage: string;
  fallbackMessage: string;
  onVisitTimeline?: () => void;
}

export function toastCreateError({
  error,
  pendingMessage,
  fallbackMessage,
  onVisitTimeline,
}: ToastCreateErrorParams) {
  if (error instanceof CreatePendingError) {
    toast.warning(pendingMessage, {
      duration: Infinity,
      action: onVisitTimeline ? { label: "Visit timeline", onClick: onVisitTimeline } : undefined,
    });
    return;
  }
  toast.error((error as Error)?.message || fallbackMessage);
}
