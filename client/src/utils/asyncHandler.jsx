export const asyncHandler =
  (fn) =>
  async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw new Error("An error occurred while processing your request");
    }
  };
