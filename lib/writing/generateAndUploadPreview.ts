import { uploadToSupabase } from '@/lib/supabase/storage/uploadToSupabase';
import { generateTextPreview } from './generateTextPreview';
import type { UploadResult } from '@/types/upload';

export const generateAndUploadPreview = async (writingText: string): Promise<UploadResult | null> => {
  if (!writingText.trim()) return null;

  try {
    const previewFile = await generateTextPreview(writingText);
    const uri = await uploadToSupabase(previewFile);
    return { uri };
  } catch (error) {
    console.error('Failed to generate text preview:', error);
    return null;
  }
};
