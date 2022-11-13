import { useState } from "react";
import { IconContext } from "react-icons";
import Joi from "joi";
import { GrClose } from "react-icons/gr";
import { signIn } from "next-auth/react";
import { startCase } from "lodash";

const crossIcon = { className: "w-5 h-5" };
export default function SignInPopup({
  setSignInPopupActive,
  setPopupActive,
  setBusinessPopup,
}) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validateLogin = (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(6).max(120).required(),
    });

    return schema.validate(data, { abortEarly: false });
  };

  async function handleSignInForm(e) {
    e.preventDefault();
    setErrors({});
    const res = validateLogin(data);
    if (res.error) {
      const a = res?.error?.details?.map((item) => ({
        name: item.context.key,
        message: item.message,
      }));
      let r = {};
      a.forEach((item) => {
        r = { ...r, [item.name]: item.message };
      });
      setErrors(r);
      return;
    }
    signIn("credentials", {
      redirect: false,
      email: data?.email,
      password: data?.password,
      state: "login",
    }).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
          setSignInPopupActive(false);
        }, 1000);
      }
      if (res.error) {
        setErrors((p) => ({ ...p, email: res.error }));
      }
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
        onClick={() => setSignInPopupActive(false)}
        onKeyDown={() => setSignInPopupActive(false)}
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
              Sign In
            </h1>
            <button
              type="button"
              className="absolute top-1 right-1 md:top-5 md:right-5"
              onClick={() => setSignInPopupActive(false)}
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
                className="bg-[#F5F5F5] px-3 py-3 rounded text-sm"
                onChange={(e) => handleInputData(e)}
              />
              {errors && (
                <p className="text-xs text-red-500 mb-4 mt-1">
                  {startCase(errors?.email)}
                </p>
              )}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="bg-[#F5F5F5] px-3 py-3 rounded text-sm"
                onChange={(e) => handleInputData(e)}
              />
              {errors && (
                <p className="text-xs text-red-500 mb-4 mt-1">
                  {startCase(errors?.password)}
                </p>
              )}
              <label
                htmlFor="remember"
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  id="remember"
                  name="remember_me"
                  className="w-4 h-4"
                  onChange={(e) => handleInputData(e)}
                />
                Remember Me
              </label>

              <button
                type="submit"
                className="text-center w-full py-3 bg-[#642CA9] mt-8 rounded-md text-white font-bold"
              >
                Login
              </button>
            </form>
            <div className="mt-16">
              Don&apos;t have an account? Join in as{" "}
              <button
                type="button"
                onClick={() => {
                  setBusinessPopup(true);
                  setSignInPopupActive(false);
                }}
              >
                <a className="text-[#642CA9] underline">Investor</a>
              </button>{" "}
              or{" "}
              <button
                type="button"
                className="text-[#642CA9] underline"
                onClick={() => {
                  setPopupActive(true);
                  setSignInPopupActive(false);
                }}
              >
                User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
