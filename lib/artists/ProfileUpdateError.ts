class ProfileUpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileUpdateError";
  }
}

export default ProfileUpdateError;
