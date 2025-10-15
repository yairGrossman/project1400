// SignIn.jsx
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

export default function SignIn({ users, onLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const CLIENT_ID =
    "374509241495-74bq4ha0ivc3h1q0iv58rdok07gs6acc.apps.googleusercontent.com";

  // Initialize Google API
  useEffect(() => {
    function start() {
      gapi.load("auth2", () => {
        gapi.auth2.init({ client_id: CLIENT_ID });
      });
    }
    start();
  }, []);

  // Local email login
  const handleLogin = () => {
    const foundUser = users.find((u) => u.email === email.trim());
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError("האימייל לא נמצא במערכת");
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    const auth2 = gapi.auth2.getAuthInstance();
    try {
      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      const name = profile.getName();
      const email = profile.getEmail();

      console.log("Google Name:", name);
      console.log("Google Email:", email);

      const foundUser = users.find((u) => u.email === email);
      if (foundUser) {
        onLogin(foundUser);
      } else {
        alert("האימייל לא נמצא במערכת");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>התחברות למערכת</h2>

      {/* Local email login */}
      <input
        type="email"
        placeholder="הכנס אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "250px",
        }}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{
          marginTop: "1rem",
          backgroundColor: "#1C6EA4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        כניסה
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Divider */}
      <hr style={{ margin: "2rem 0", width: "200px" }} />

      {/* Google login */}
      <button
        onClick={handleGoogleSignIn}
        style={{
          marginTop: "1rem",
          backgroundColor: "#DB4437",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        התחבר עם Google
      </button>
    </div>
  );
}
