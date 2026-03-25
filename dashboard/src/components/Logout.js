export const logoutUser = () => {
  try {
    // 🔥 clear auth data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");

    // optional: clear everything
    // localStorage.clear();

    // 🔥 redirect to login
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout error:", err);
  }
};