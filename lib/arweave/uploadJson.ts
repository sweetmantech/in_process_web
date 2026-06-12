import { uploadJsonToSupabase } from "@/lib/supabase/storage/uploadJsonToSupabase";
import type { UploadResult } from "@/types/upload";

export async function uploadJson(json: object): Promise<UploadResult> {
  const uri = await uploadJsonToSupabase(json);
  return { uri };
}
