import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLogged = localStorage.getItem("loggedin");

  if (!isLogged) {
    return redirect(
      `/login?message=you must login first&redirectTo=${pathname}`
    );
  }

  return null
}
