import axios from "axios";
let data = localStorage.getItem("userDetails");
data = JSON.parse(data);
export const LoginApi = async (data) => {
  try {
    const { username, password } = data;

    const response = await axios.post("http://localhost:3001/login", {
      username,
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

export const UserListApi = async (token) => {
  try {
    const response = await axios.get("http://localhost:3001/user_list", {
      headers: { Authorization: `Bearer ${data.token}` },
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
    const response = await axios.get("http://localhost:3001/chat_list", {
      params: { receiverID },  // Pass receiverID as a query parameter
      headers: { Authorization: `Bearer ${data.token}` },
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
    const response = await axios.get("http://localhost:3001/user_receiver_list", {
      params: { receiverID },  // Pass receiverID as a query parameter
      headers: { Authorization: `Bearer ${data.token}` },
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

export const UserSearchListApi = async (value) => {
  try {
    const response = await axios.get("http://localhost:3001/user_search_list", {
      params: { value },
      headers: { Authorization: `Bearer ${data.token}` },
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
