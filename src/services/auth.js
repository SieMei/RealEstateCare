
export function isAuthenticated() {
  try {
    return Boolean(localStorage.getItem("auth"));
  } catch {
    return false;
  }
}

export function login({ email, user }) {
  // zet demo-token + user in localStorage
  try {
    localStorage.setItem("auth", "demo-token");
    if (user) localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("email", email || "");
  } catch {}
}

export function logout() {
  try {
    localStorage.removeItem("auth");
  } catch {}
}