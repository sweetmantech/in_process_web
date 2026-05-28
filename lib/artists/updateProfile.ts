import { IN_PROCESS_API } from "@/lib/consts";

export interface UpdateProfileInput {
  authHeaders: HeadersInit;
  username?: string;
  bio?: string;
  instagram?: string;
  x?: string;
  telegram?: string;
}

const updateProfile = async ({
  authHeaders,
  username,
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
      bio,
      instagram,
      x,
      telegram,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP ${res.status}`);
  }
};

export default updateProfile;
