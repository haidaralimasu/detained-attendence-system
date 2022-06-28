import React, { useState, useEffect } from "react";
import { notifyError, notifySuccess } from "../../helper/notifications";
import { signin, authenticate } from "../../helper/auth";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });
  const { username, password } = values;

  const handleChange = (username) => (event) => {
    setValues({ ...values, error: false, [username]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ username, password })
      .then((data) => {
        console.log(data);
        if (data.access) {
          authenticate(data, () => {
            console.log("Token Added");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
          notifySuccess("Signed In Successfully");

          window.location.reload(false);
        } else {
          setValues({
            ...values,
            loading: false,
          });
          notifyError("Something Went Wrong");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="container my-4">
      <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>Login</h1>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Username
        </label>
        <input
          required
          value={username}
          onChange={handleChange("username")}
          type="name"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
          required
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <button onClick={onSubmit} type="submit" class="btn w-100 btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;
