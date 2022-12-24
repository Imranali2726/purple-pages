import { useState } from "react";
import { IconContext } from "react-icons";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { startCase } from "lodash";
import { getAPIUrl, getCSRFCookieUrl } from "../../services/utils";

const crossIcon = { className: "w-5 h-5" };
export default function ForgotPasswordPopup({ setForgotPassword }) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSignInForm(e) {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    setMsg(null);
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    if (!data?.email) {
      setErrors((p) => ({ ...p, email: "Email cannot be empty" }));
      setIsLoading(false);
      return;
    }

    if (!data?.email.match(mailformat)) {
      setErrors((p) => ({ ...p, email: "Please enter a valid email" }));
      setIsLoading(false);
      return;
    }
    axios.get(`${getCSRFCookieUrl()}sanctum/csrf-cookie`).then(() => {
      axios({
        method: "post",
        url: `${getAPIUrl()}forget-password`,
        data: {
          email: data?.email,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          setIsLoading(false);
          setMsg(res?.data?.message);
          setTimeout(() => {
            setForgotPassword(false);
          }, 5000);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrors((p) => ({ ...p, backend: err?.response?.data?.message }));
        });
    });
  }

  function handleInputData(e) {
    const { name, value, checked } = e.target;
    if (name === "remember_me") {
      if (checked) setData((p) => ({ ...p, [name]: 1 }));
      else setData((p) => ({ ...p, [name]: 0 }));
    } else {
      setData((p) => ({ ...p, [name]: value }));
    }
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        role="switch"
        aria-checked
        aria-label="Button"
        tabIndex="0"
        className="fixed inset-0 backdrop-blur-md z-20"
        onClick={() => setForgotPassword(false)}
        onKeyDown={() => setForgotPassword(false)}
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] w-[95%] max-h-[95vh] overflow-auto xl:max-w-[1209px] fixed z-30 shadow-[0_0_15px_rgba(0,0,0,0.35)]">
          <div className="bg-[#642CA9] flex items-center justify-center py-4">
            <div>
              <img src="/images/logo.png" alt="" className="mx-auto" />
              <p className="text-white mt-2 font-semibold text-xl">
                Access to society
              </p>
            </div>
          </div>
          <div className="bg-white py-4 px-8 md:py-12 md:px-20 relative">
            <h1 className="text-[35px] font-bold text-[#737373] mb-10">
              Forgot Password
            </h1>
            <button
              type="button"
              className="absolute top-1 right-1 md:top-5 md:right-5"
              onClick={() => setForgotPassword(false)}
            >
              <IconContext.Provider value={crossIcon}>
                <GrClose />
              </IconContext.Provider>
            </button>

            <form className="flex flex-col gap-1" onSubmit={handleSignInForm}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="bg-[#F5F5F5] px-3 py-3 rounded text-sm mt-6"
                onChange={(e) => handleInputData(e)}
              />
              {errors?.email && (
                <p className="text-xs text-red-500 mb-4 mt-1">
                  {startCase(errors?.email)}
                </p>
              )}
              {errors?.backend && (
                <p className="text-xs text-red-500 mb-4 mt-1">
                  {startCase(errors?.backend)}
                </p>
              )}

              <button
                type="submit"
                className={`text-center w-full py-3 bg-[#642CA9] mt-12 rounded-md text-white font-bold ${
                  isLoading ? "opacity-70" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Reset Password"}
              </button>
              {msg && <p className="text-sm text-green-500 my-1">{msg}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
