import axios from "axios";

export const LoginApi = async (data) => {
  try {
    const { email, password } = data;
    const response = await axios.post("http://localhost:3001/login", {
      email,
      password,
    });

    if (response && response.status === 200) {
      return {
        status: "success",
        message: "Login successful",
        data: response.data,
      };
    } else {
      return { status: "error", message: "Invalid email or password" };
    }
  } catch (err) {
    console.error("Error in login:", err);
    return { status: "error", message: "Login failed", error: err };
  }
};

const getToken = () => {
  try {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      throw new Error("User not logged in");
    }
    const parsedData = JSON.parse(userDetails);
    if (!parsedData.token) {
      throw new Error("Token is missing in user details");
    }
    return parsedData.token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const UserListApi = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get("http://localhost:3001/user_list", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response && response.status === 200) {
      return {
        status: "success",
        message: "User list retrieved successfully",
        data: response.data,
      };
    } else {
      return { status: "error", message: "Failed to retrieve user list" };
    }
  } catch (err) {
    console.error("Error in User List:", err);
    return { status: "error", message: "Error fetching user list", error: err };
  }
};

export const ChatListApi = async (receiverID) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get("http://localhost:3001/chat_list", {
      params: { receiverID },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response && response.status === 200) {
      return {
        status: "success",
        message: "Chat list retrieved successfully",
        data: response.data,
      };
    } else {
      return { status: "error", message: "Failed to retrieve Chat list" };
    }
  } catch (err) {
    console.error("Error in Chat List:", err);
    return { status: "error", message: "Error fetching Chat list", error: err };
  }
};

export const UserReceiverListApi = async (receiverID) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(
      "http://localhost:3001/user_receiver_list",
      {
        params: { receiverID },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response && response.status === 200) {
      return {
        status: "success",
        message: "User receiver list retrieved successfully",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        message: "Failed to retrieve user receiver list",
      };
    }
  } catch (err) {
    console.error("Error in User Receiver List:", err);
    return {
      status: "error",
      message: "Error fetching user receiver list",
      error: err,
    };
  }
};

export const UserProfileListApi = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(
      "http://localhost:3001/user_profile_list",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response && response.status === 200) {
      return {
        status: "success",
        message: "User Profile list retrieved successfully",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        message: "Failed to retrieve user Profile list",
      };
    }
  } catch (err) {
    console.error("Error in User Profile List:", err);
    return {
      status: "error",
      message: "Error fetching user Profile list",
      error: err,
    };
  }
};

export const UpdateUserProfileListApi = async (data) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const { username } = data;

    const response = await axios.put(
      "http://localhost:3001/update_user_profile_list",
      { username },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response && response.status === 200) {
      return {
        status: "success",
        message: "Profile updated successfully",
        data: response.data,
      };
    } else {
      return { status: "error", message: "Failed to update profile" };
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    return { status: "error", message: "Profile update failed", error: err };
  }
};

export const UserStoriesListApi = async (receiverID) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(
      "http://localhost:3001/user_stories_list",
      {
        params: { receiverID },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response && response.status === 200) {
      return {
        status: "success",
        message: "User receiver list retrieved successfully",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        message: "Failed to retrieve user receiver list",
      };
    }
  } catch (err) {
    console.error("Error in User Receiver List:", err);
    return {
      status: "error",
      message: "Error fetching user receiver list",
      error: err,
    };
  }
};
