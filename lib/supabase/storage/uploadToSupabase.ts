import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";

const BUCKET = "in_process_files";

export const uploadToSupabase = async (file: File): Promise<string> => {
  const path = uuidv4();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(`Supabase upload failed: ${error.message}`);
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
};
