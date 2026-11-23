class CreatePendingError extends Error {
  constructor() {
    super("Create request did not finish");
    this.name = "CreatePendingError";
  }
}

export default CreatePendingError;
