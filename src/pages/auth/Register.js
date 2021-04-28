import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Register({ history }) {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  async function handleSubmit(e) {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
        `Confirmation email has been sent to ${email}. Click the link to complete your registration.`
      );
      // save user email in local storage
      window.localStorage.setItem("emailForRegistration", email);
      // clear state
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  }

  // handleCodeInApp needs to be true. This prevents you from starting your registration on one app then completing it on another

  function registerForm() {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
        <button type="submit" className="btn btn-raised mt-3">
          Register
        </button>
      </form>
    );
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
