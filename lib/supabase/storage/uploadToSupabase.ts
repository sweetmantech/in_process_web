import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { isRetryableStorageError } from "./isRetryableStorageError";

const BUCKET = "in_process_files";
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

export const uploadToSupabase = async (file: File): Promise<string> => {
  for (let attempt = 1; ; attempt++) {
    const path = uuidv4();
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    if (!error) return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    if (attempt >= MAX_ATTEMPTS || !isRetryableStorageError(error)) {
      throw new Error(`Supabase upload failed: ${error.message}`);
    }
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt));
  }
};
