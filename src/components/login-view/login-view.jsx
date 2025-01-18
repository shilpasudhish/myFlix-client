import { useState } from "react";

function Loginview({ onLoggedIn }) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // Handle form submission
  const handlesubmit = (event) => {
    event.preventDefault();

    // Construct the URL with query parameters
    const url = new URL(
      "https://movie-flex-api-95d248252fac.herokuapp.com/login"
    );
    url.searchParams.append("username", Username);
    url.searchParams.append("password", Password);

    // Send POST request using fetch
    fetch(url, {
      method: "POST", // Make sure it's a POST request
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response", data);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <label>
          Username
          <input
            type="text"
            value={Username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={Password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Loginview;
