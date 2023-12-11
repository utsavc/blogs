import { Form, NavLink, redirect, useActionData, useLoaderData } from "react-router-dom";
import { loginUser } from "../api/api";

export function loginLoader({ request }) {
  const url = new URL(request.url);
  const message = url.searchParams.get("message");
  return message;
}

export async function loginAction({ request }) {
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/blogs";
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    const data = await loginUser({ username, password });
    localStorage.setItem("token",data.token)
    localStorage.setItem("loggedin", true);
    return redirect(pathname);
  } catch (error) {
    return error.message;
  }
}

export default function Login() {
  const error = useActionData();
  const message=useLoaderData();
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 offset-3 p-5">
            <h3>Login to Continue..</h3>
            <Form replace method="post">
              <div className="mt-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="username">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
                 Not Registered ?? <NavLink to="/register">Register Here</NavLink>
                 {message && <div class="alert alert-danger mt-2" role="alert">
                  <strong>{message}</strong>
                 </div>}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
