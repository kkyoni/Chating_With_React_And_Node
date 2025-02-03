import axios from "axios";
const baseUrl = "http://localhost:3001";

export const LoginApi = async (data) => {
  try {
    const { email, password } = data;
    const response = await axios.post(`${baseUrl}/login`, {
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
    return null;
  }
};

export const UserListApi = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(`${baseUrl}/user_list`, {
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
    return { status: "error", message: "Error fetching user list", error: err };
  }
};

export const ChatListApi = async (receiverID) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(`${baseUrl}/chat_list`, {
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
    return { status: "error", message: "Error fetching Chat list", error: err };
  }
};

export const UserReceiverListApi = async (receiverID) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(`${baseUrl}/user_receiver_list`, {
      params: { receiverID },
      headers: { Authorization: `Bearer ${token}` },
    });

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

    const response = await axios.get(`${baseUrl}/user_profile_list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
      `${baseUrl}/update_user_profile_list`,
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
    return { status: "error", message: "Profile update failed", error: err };
  }
};

export const UserStoriesListApi = async (receiverID) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(`${baseUrl}/user_stories_list`, {
      params: { receiverID },
      headers: { Authorization: `Bearer ${token}` },
    });

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
    return {
      status: "error",
      message: "Error fetching user receiver list",
      error: err,
    };
  }
};

export const UserViewStoriesListApi = async (id, receiverID) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.post(
      `${baseUrl}/user_view_stories_list`,
      { id, receiverID },
      { headers: { Authorization: `Bearer ${token}` } }
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
    return {
      status: "error",
      message: "Error fetching user receiver list",
      error: err,
    };
  }
};

export const AddStoriesListApi = async (formData) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.post(`${baseUrl}/add_stories_list`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return {
        status: "success",
        message: "Image uploaded successfully",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        message: response.data.message || "Image upload failed",
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: "An error occurred while uploading",
      error: err,
    };
  }
};

export const UserSelfStoriesListApi = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(`${baseUrl}/user_self_stories_list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    return {
      status: "error",
      message: "Error fetching user receiver list",
      error: err,
    };
  }
};

export const UserGetStoriesListApi = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.get(`${baseUrl}/get_user_stories_list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    return {
      status: "error",
      message: "Error fetching user receiver list",
      error: err,
    };
  }
};

export const UpdateUserChangePasswordListApi = async (data) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.put(
      `${baseUrl}/update_user_change_password_list`,
      { data },
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
    return { status: "error", message: "Profile update failed", error: err };
  }
};

export const UserChatStatusListApi = async (receiverId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.put(
      `${baseUrl}/update_user_chat_status_list`,
      { receiverId },
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
    return { status: "error", message: "Profile update failed", error: err };
  }
};

export const UserChatDeleteListApi = async (deleteId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.put(
      `${baseUrl}/user_chat_delete_list`,
      { deleteId },
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
    return { status: "error", message: "Profile update failed", error: err };
  }
};

export const DeleteUserChatListApi = async (receiverId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No valid token found");
    }

    const response = await axios.post(
      `${baseUrl}/delete_user_chat_list`,
      { receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
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
    return {
      status: "error",
      message: "Error fetching user receiver list",
      error: err,
    };
  }
};