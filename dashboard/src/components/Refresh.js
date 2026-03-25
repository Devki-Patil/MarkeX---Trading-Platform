import axios from "../Services/AxiosInstance";

/* =====================================================
   1️⃣ REFRESH TOKEN FUNCTION (AUTH ONLY)
   ===================================================== */
export async function refreshToken() {
  try {
    const res = await axios.post("/refresh");
    return res.data.accessToken;
  } catch (err) {
    return null;
  }
}

/* =====================================================
   2️⃣ REFRESH EVENT SYSTEM (UI AUTO-UPDATE)
   ===================================================== */
class RefreshEvent {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(fn) {
    if (typeof fn !== "function") return () => {};
    this.listeners.add(fn);

    return () => {
      this.listeners.delete(fn);
    };
  }

  trigger() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error("Refresh listener error:", err);
      }
    });
  }

  clear() {
    this.listeners.clear();
  }
}

const refresh = new RefreshEvent();
export default refresh;
