import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noxLogo from "../../public/assets/noxLogoTransparent.png";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log("Data error:", err);
      }
    };

    fetchUsers();
  }, []);

  const decoding = (pass) => {
    return (
      pass.substring(Math.floor(pass.length / 2), pass.length) +
      pass.substring(0, Math.floor(pass.length / 2))
    );
  };

  const login = async () => {
    setError("");

    if (!mail || !password) {
      setError("Please fill all the blanks!");
      setMail("");
      setPassword("");
      return;
    }

    const currentUser = users.find((user) => user.mail === mail);

    if (!currentUser) {
      setError("This mail doesn't exist!");
      return;
    }

    if (currentUser.password !== decoding(password)) {
      setError("The password is incorrect!");
      return;
    }

    try {
      // 1) Server: isAuth true
      await fetch(`http://localhost:3001/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAuth: true }),
      });

      // 2) UI: context state update
      dispatch({
        type: "LOGIN",
        payload: { ...currentUser, isAuth: true },
      });

      // 3) localStorage: ELLE YAZMA. AppContext zaten state'i yazıyor.
      setSuccess(true);

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.log(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-6">
      <div className="w-full max-w-md bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-900 border border-neutral-800 rounded-2xl p-10 shadow-xl">
        <div className="flex mx-auto left mb-6 pl-1">
          <img
            src={noxLogo}
            alt="Nox Logo"
            className="h-10 w-auto opacity-90"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2 text-left">
            Log-in to your account
          </h1>
          <p className="text-sm text-neutral-400 text-left">
            Continue from where you left off with Nox.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-100 focus:outline-none focus:border-black"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-100 focus:outline-none focus:border-black"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {!success ? (
            <button
              type="submit"
              className="w-full rounded-full bg-black py-3 text-white text-sm font-medium hover:bg-neutral-700 transition"
            >
              Log in
            </button>
          ) : (
            <div className="w-full rounded-full py-3 bg-green-600 text-white text-sm font-medium text-center">
              Welcome 🎉
            </div>
          )}
        </form>

        <p className="mt-8 text-center text-sm text-neutral-400 float-right pr-1">
          You don't have an account?
          <a
            href="/signup"
            className="ml-1 text-neutral-100 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
