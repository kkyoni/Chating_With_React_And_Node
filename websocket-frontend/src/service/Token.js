export const getUserIdFromToken = () => {
  try {
    const data = localStorage.getItem("userDetails");
    if (!data) {
      throw new Error("No user details found in localStorage");
    }

    const parsedData = JSON.parse(data);
    if (!parsedData.token) {
      throw new Error("Token is missing in user details");
    }

    const tokenParts = parsedData.token.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = tokenParts[1];
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return decodedPayload.userId;
  } catch (error) {
    return {
      status: "error",
      message: "Error decoding token",
      error: error,
    };
  }
};