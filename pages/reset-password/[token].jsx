import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import TextInput from "../../components/base/TextInput";

export default function Token() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    email: null,
    password: null,
    cPassword: null,
  });
  const [msg, setMsg] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    setIsLoading(true);
    if (password !== cPassword) {
      setError({
        password: "Password do not match!",
        cPassword: "Password do not match!",
      });
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError((p) => ({ ...p, password: "Password cannot be empty" }));
      setIsLoading(false);
      return;
    }
    if (!cPassword) {
      setError((p) => ({
        ...p,
        cPassword: "Password confirmation cannot be empty",
      }));
      setIsLoading(false);
      return;
    }
    axios
      .get(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.BASE_LOCAL_SERVER
            : process.env.BASE_UAT_SERVER
        }sanctum/csrf-cookie`,
      )
      .then(() => {
        axios({
          method: "post",
          url: `${
            process.env.NODE_ENV === "development"
              ? process.env.BASE_URL_LOCAL
              : process.env.BASE_URL_UAT
          }reset-password`,
          data: {
            email,
            token: router.query.token,
            password,
            password_confirmation: cPassword,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
          .then(() => {
            setMsg("Your password has been changed!");
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      });
  }
  return (
    <div>
      <section className="internal-header-bg h-auto pb-8 md:h-[300px] pt-[120px] md:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="flex items-center h-full pp-container">
          <h1 className="capitalize text-2xl lg:text-4xl text-white font-bold">
            Reset Password
          </h1>
        </div>
      </section>
      <form className="pp-container py-8" onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          name="email"
          id="email"
          border
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-xs my-1">{error?.password}</p>
        )}
        <TextInput
          label="New Password"
          name="password"
          id="password"
          border
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6"
        />
        {error && (
          <p className="text-red-500 text-xs my-1">{error?.password}</p>
        )}
        <TextInput
          label="Confirm Password"
          name="cPassword"
          id="cPassword"
          border
          type="password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          className="mt-6"
        />
        {error && (
          <p className="text-red-500 text-xs my-1">{error?.cPassword}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-6 py-4 text-white font-semibold rounded-md text-xl bg-[#642CA9] w-full text-center ${
            isLoading ? "opacity-70" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
        {msg && <p className="text-sm my-1 text-green-500">{msg}</p>}
      </form>
    </div>
  );
}
