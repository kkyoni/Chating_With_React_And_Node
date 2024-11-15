let data = localStorage.getItem("userDetails");
data = JSON.parse(data);
export const getUserIdFromToken = () => {
    try {
      const tokenParts = data.token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token");
      }
      const payload = tokenParts[1];
      const decodedPayload = JSON.parse(
        atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
      );
      return decodedPayload.userId; // Ensure `userId` matches the field name in your token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  