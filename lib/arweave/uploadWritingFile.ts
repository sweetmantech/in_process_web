import { uploadToSupabase } from '@/lib/supabase/storage/uploadToSupabase';
import type { UploadResult } from '@/types/upload';

export const uploadWritingFile = async (content: string): Promise<UploadResult> => {
  const blob = new Blob([content], { type: 'text/plain' });
  const writingFile = new File([blob], 'writing.txt', { type: 'text/plain' });
  const uri = await uploadToSupabase(writingFile);
  return { uri };
};
