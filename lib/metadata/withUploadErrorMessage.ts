export const UPLOAD_ERROR_MESSAGE =
  "Your upload didn't go through. Please check your connection and try again.";

export async function withUploadErrorMessage<T>(upload: () => Promise<T>): Promise<T> {
  try {
    return await upload();
  } catch (error) {
    console.error(error);
    throw new Error(UPLOAD_ERROR_MESSAGE);
  }
}
