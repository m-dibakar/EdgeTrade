import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL, DASHBOARD_URL } from "../../config";

function Signup() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const body = isLogin
        ? { email, password }
        : { username, email, password };
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong, please try again");
        setLoading(false);
        return;
      }
      window.location.href = `${DASHBOARD_URL}/?token=${encodeURIComponent(
        data.token
      )}&username=${encodeURIComponent(data.user.username)}`;
    } catch (err) {
      setError("Could not reach the server, please try again");
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "450px" }}>
      <div className="text-center mb-4">
        <h2>{isLogin ? "Login to EdgeTrade" : "Open a free demat account"}</h2>
        <p className="text-muted">
          {isLogin
            ? "Access your dashboard and portfolio"
            : "Start trading with ₹1,00,000 in virtual funds"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Full name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Please wait…" : isLogin ? "Login" : "Sign up"}
        </button>
      </form>

      <p className="text-center mt-3">
        {isLogin ? "New to EdgeTrade?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="btn btn-link p-0 align-baseline"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Signup;
