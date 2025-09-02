import API_URL from "@/utils/api";

export const registerUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json(); // expected: { token: "...", user: {...} }
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json(); // expected: { token: "...", user: {...} }
  } catch (error) {
    throw error;
  }
};
