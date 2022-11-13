import { useState } from "react";
import { IconContext } from "react-icons";
import Joi from "joi";
import { startCase } from "lodash";
import { GrClose } from "react-icons/gr";
import { signIn } from "next-auth/react";

const crossIcon = { className: "w-5 h-5" };

export default function BusinessSignup({ setPopupActive }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(0);
  const [errors, setErrors] = useState({});

  const validateRegister = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required(),
    });

    return schema.validate(data, { abortEarly: false });
  };

  async function handleSignUpForm(e) {
    e.preventDefault();
    const reg = validateRegister({ firstName, lastName, email, password });
    if (reg.error) {
      const a = reg?.error?.details?.map((item) => ({
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

    setErrors({});

    signIn("credentials", {
      redirect: false,
      state: "register",
      email,
      password,
      firstName,
      lastName,
      type: "business",
    }).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
          setPopupActive(false);
        }, 1000);
      }
      if (res.error) {
        setErrors((p) => ({ ...p, email: res.error }));
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        role="switch"
        aria-checked
        aria-label="Button"
        tabIndex="0"
        className="fixed inset-0 backdrop-blur-md z-20"
        onClick={() => setPopupActive(false)}
        onKeyDown={() => setPopupActive(false)}
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
              Business Sign Up
            </h1>
            <button
              type="button"
              className="absolute top-1 right-1 md:top-5 md:right-5"
              onClick={() => setPopupActive(false)}
            >
              <IconContext.Provider value={crossIcon}>
                <GrClose />
              </IconContext.Provider>
            </button>

            <form className="flex flex-col gap-1" onSubmit={handleSignUpForm}>
              <input
                type="text"
                name="firstName"
                id="name"
                value={firstName}
                className="bg-[#F5F5F5] px-3 py-3 rounded text-sm"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors && (
                <p className="text-xs text-red-500 mb-4">
                  {startCase(errors?.firstName)}
                </p>
              )}
              <input
                type="text"
                name="lastName"
                id="name"
                value={lastName}
                className="bg-[#F5F5F5] px-3 py-3 rounded text-sm"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors && (
                <p className="text-xs text-red-500 mb-4">
                  {startCase(errors?.lastName)}
                </p>
              )}
              <input
                type="email"
                name="email"
                value={email}
                id="email"
                placeholder="Email"
                className="bg-[#F5F5F5] px-3 py-3 rounded text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors && (
                <p className="text-xs text-red-500 mb-4">
                  {startCase(errors?.email)}
                </p>
              )}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                className="bg-[#F5F5F5] px-3 py-3 rounded text-sm    "
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors && (
                <p className="text-xs text-red-500 mb-4">
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
                  defaultChecked={remember === 1}
                  name="remember_me"
                  className="w-4 h-4"
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) setRemember(1);
                    else setRemember(0);
                  }}
                />
                Keep me signed in
              </label>

              <p className="mt-4 text-xs lg:text-sm">
                By signing in, I agree to the Purple Pages Terms and Conditions,
                Privacy Statement and Terms and Conditions.
              </p>
              <button
                type="submit"
                className="text-center w-full py-3 bg-[#642CA9] mt-4 rounded-md text-white font-bold"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
