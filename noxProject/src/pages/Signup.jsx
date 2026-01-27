import { useEffect, useState } from "react";
import noxLogo from "../../public/assets/noxLogoTransparent.png";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async () => {
    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: mail,
        password: encoding(password),
        cart: [],
        favourites: [],
        isAuth: false,
      }),
    });
  };

  const encoding = (pass) => {
    pass =
      pass.substring(Math.floor(pass.length / 2), pass.length) +
      pass.substring(0, Math.floor(pass.length / 2));
    return pass;
  };

  const signup = () => {
    setError("");

    if (!mail || !password) {
      setMail("");
      setPassword("");
      setError("Fill all the blanks!");
      return;
    }

    const exists = users.some((user) => user.mail === mail);

    if (exists) {
      setError("This email already exists!");
      setSuccess(false);
      return;
    }

    addUser();
    setSuccess(true);
    setMail("");
    setPassword("");
    setTimeout(() => setSuccess(false), 1000);
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-10 shadow-xl">
        {/* LOGO */}
        <div className="flex justify-start mb-6">
          <img src={noxLogo} alt="Nox Logo" className="h-10 opacity-90" />
        </div>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Start your Nox experience
          </h1>
          <p className="text-sm text-neutral-400">
            Join Nox and experience intentional technology.
          </p>
        </div>

        {/* FORM */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {!success ? (
            <button
              type="submit"
              className="w-full rounded-full bg-black py-3 text-white text-sm font-medium hover:bg-neutral-700 transition"
            >
              Sign Up
            </button>
          ) : (
            <div className="w-full rounded-full py-3 bg-green-600 text-white text-sm font-medium text-center">
              Success 🎉
            </div>
          )}
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-right text-sm text-neutral-400">
          Already have an account?
          <a
            href="/login"
            className="ml-1 text-neutral-100 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
