import { uploadToSupabase } from './uploadToSupabase';

export const uploadJsonToSupabase = async (json: object): Promise<string> => {
  const file = new File([JSON.stringify(json)], 'metadata.json', {
    type: 'application/json',
  });
  return uploadToSupabase(file);
};
