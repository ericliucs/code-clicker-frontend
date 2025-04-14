import { useState } from "react";
import { login, register } from "../../services/api";
import eventService from "../../services/events";

export default function LoginButton() {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;

      if (isRegisterMode) {
        response = await register(username, password);
      } else {
        response = await login(username, password);
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setIsLoggedIn(true);
      setIsModalShowing(false);

      eventService.publish('auth:login', response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    setIsLoggedIn(false);
    
    eventService.publish('auth:logout');
  };

  return (
    <>
      <button
        className="mt-1 ml-4 p-0.5 border-2 rounded-sm hover:border-green-700"
        onClick={() => (isLoggedIn ? handleLogout() : setIsModalShowing(true))}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      {isModalShowing && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-950/80 z-99">
          <div className="bg-gray-800 p-4 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">
              {isRegisterMode ? "Register Account" : "Login"}
            </h2>

            {error && <p className="text-red-400 mb-2">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block">Username</label>
                <input
                  className="w-full bg-gray-900 p-2 rounded"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block">Password</label>
                <input
                  className="w-full bg-gray-900 p-2 rounded"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
                >
                  {isRegisterMode ? "Register" : "Login"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalShowing(false)}
                  className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>

              <p className="mt-2 text-sm">
                {isRegisterMode
                  ? "Already have an account? Then what are you doing here? "
                  : "Don't have an account to save your progress?"}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                >
                  {isRegisterMode ? "Login" : "Register now"}
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
