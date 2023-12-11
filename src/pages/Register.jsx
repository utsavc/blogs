import { Form, NavLink, redirect, useActionData } from "react-router-dom";
import { registerUser } from "../api/api";

export function registerLoder({ request }) {
  return null;
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    const data = await registerUser({ username, password });
    console.log(data.message);
    return data.message;
  } catch (error) {
    return error.message;
  }
}
export default function Register() {
  const message = useActionData();
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 offset-3">
            <h3>Register</h3>
            <Form replace method="post" autoComplete="off">
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
              {/* <div className="mt-3">
                <label htmlFor="username">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div> */}
              <div className="mt-3">
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
                Already Registered ?? <NavLink to="/login">Login</NavLink>
              </div>
              {message && (
                <div
                  className={`mt-3 alert ${
                    message === "Username already exists"
                      ? "alert-danger"
                      : "alert-success"
                  }`}
                >
                  {message}
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
