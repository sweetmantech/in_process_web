import { IN_PROCESS_API } from "@/lib/consts";
import ProfileUpdateError from "@/lib/artists/ProfileUpdateError";

export interface UpdateProfileInput {
  authHeaders: HeadersInit;
  username?: string;
  handle?: string;
  bio?: string;
  instagram?: string;
  x?: string;
  telegram?: string;
}

const updateProfile = async ({
  authHeaders,
  username,
  handle,
  bio,
  instagram,
  x,
  telegram,
}: UpdateProfileInput) => {
  const res = await fetch(`${IN_PROCESS_API}/profile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      username,
      handle,
      bio,
      instagram,
      x,
      telegram,
    }),
  });

  if (res.status === 409) {
    throw new ProfileUpdateError("This handle is already taken.");
  }

  if (res.status === 400) {
    const body = await res.json().catch(() => null);
    const handleIssue = body?.errors?.find((issue: { field?: string }) => issue.field === "handle");
    if (handleIssue?.message) throw new ProfileUpdateError(handleIssue.message);
  }

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(errorText || `HTTP ${res.status}`);
  }
};

export default updateProfile;
