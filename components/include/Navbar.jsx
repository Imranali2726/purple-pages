import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import { BsFillCaretDownFill } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { useMemo, useState, useRef, useEffect } from "react";
import AuthenticationPopup from "./AuthenticationPopup";
import SignInPopup from "./SignInPopup";
import BusinessSignup from "./BusinessSignup";
import ForgotPasswordPopup from "./ForgotPasswordPopup";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [signInPopupActive, setSignInPopupActive] = useState(false);
  const [businessPopup, setBusinessPopup] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const headerRef = useRef();
  const navRef = useRef();
  const dropdownAcc = useRef();
  const session = useSession();
  const links = [
    { label: "Home", link: "/" },
    // { label: "Listing", link: "/listing" },
    { label: "About", link: "#" },
    { label: "FAQ's", link: "#" },
    { label: "Policies", link: "#" },
    { label: "Contact", link: "#" },
  ];
  const iconStyles = useMemo(
    () => ({
      className: "fill-white w-6 h-6 hover:fill-[rgba(255,255,255,0.8)]",
    }),
    // eslint-disable-next-line prettier/prettier
    [],
  );

  function getScroll() {
    if (window.scrollY > 90) {
      headerRef.current?.classList?.add("bg-purple-500");
      headerRef.current?.classList?.remove("bg-transparent");
    } else {
      headerRef.current?.classList?.remove("bg-purple-500");
      headerRef.current?.classList?.add("bg-transparent");
    }
  }

  function closeDropdown(e) {
    if (dropdownAcc.current && !dropdownAcc.current.contains(e.target)) {
      setDropdown(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", getScroll);
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("scroll", getScroll);
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <header
      className={`relative inset-x-0 top-0 z-[100] ${
        isActive ? "bg-purple-500 lg:bg-transparent" : "bg-transparent"
      }`}
      ref={headerRef}
    >
      <div className="px-8">
        <div className="border-b-2 py-2 flex items-center justify-between max-w-[1644px] mx-auto">
          <div>
            <Link href="/">
              <a>
                <img
                  src="/images/logo.png"
                  alt=""
                  className="w-[80px] lg:w-auto"
                />
              </a>
            </Link>
          </div>
          <div>
            <div
              className={`fixed inset-x-0 top-[65px] bottom-0 lg:static flex flex-col lg:flex-row items-center gap-4 transition-[height_200ms_ease-in-out] overflow-hidden lg:overflow-visible  ${
                isActive
                  ? "h-screen pt-4 lg:pt-0 lg:h-auto bg-purple-500 lg:bg-transparent"
                  : "h-0 lg:h-auto"
              } `}
              ref={navRef}
            >
              <nav className="">
                <ul className="flex flex-col lg:flex-row items-center lg:border-r-2 pr-4 lg:pr-8">
                  {links.map((item) => (
                    <li className="p-2 lg:p-3" key={item.label}>
                      <Link href={item.link}>
                        <a
                          role="button"
                          tabIndex={0}
                          className="font-semibold  xl:font-bold xl:text-lg text-white"
                          onClick={() => setIsActive(false)}
                          onKeyDown={(e) => {
                            if (e.key === "Escape") setIsActive(false);
                          }}
                        >
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="relative" ref={dropdownAcc}>
                {session.status !== "authenticated" && (
                  <button
                    type="button"
                    onClick={() => setSignInPopupActive(true)}
                    className="bg-primary text-white font-medium xl:text-lg xl:font-semibold p-4 
                  rounded-lg pp-shadow signInBtn"
                  >
                    Sign In/Register
                  </button>
                )}
                {session.status === "authenticated" && (
                  <>
                    <button
                      type="button"
                      className="flex items-center gap-1"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <img
                        src={
                          session?.data?.image?.[0]?.original_url ??
                          "/images/image-placeholder.png"
                        }
                        alt=""
                        className=" w-14 h-14 rounded-full"
                      />
                      <BsFillCaretDownFill className="fill-white" />
                    </button>
                    {dropdown && (
                      <div className="absolute right-0 top-[4.5rem] bg-[#c999ef] text-white shadow-lg w-[240px] rounded-md">
                        <ul className="flex flex-col items-center justify-start px-4">
                          <li className="w-full font-semibold pb-2 pt-4">
                            {session?.data?.user?.name}
                          </li>
                          <li className="w-full border-t">
                            <div className="text-lg font-semibold my-2">
                              Account
                            </div>
                            <Link href="/my-account">
                              <a
                                onClick={() => setDropdown(false)}
                                role="button"
                                onKeyDown={() => setDropdown(false)}
                                tabIndex="0"
                                className="my-2 flex items-center justify-start gap-2  hover:text-white w-full text-center hover:opacity-70"
                              >
                                My Account
                              </a>
                            </Link>
                            <Link href="#">
                              <a
                                onClick={() => setDropdown(false)}
                                role="button"
                                onKeyDown={() => setDropdown(false)}
                                tabIndex="0"
                                className="my-2 flex items-center justify-start gap-2  hover:text-white w-full text-center hover:opacity-70"
                              >
                                Terms and Conditions
                              </a>
                            </Link>
                          </li>
                          <li className="w-full border-t">
                            <button
                              type="button"
                              onClick={() => signOut()}
                              className="py-3 font-semibold w-full flex items-center gap-2 justify-start  hover:text-white hover:opacity-70"
                            >
                              Sign Out
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="lg:hidden">
              <button
                type="button"
                title="Hamburger Menu Button"
                onClick={() => setIsActive(!isActive)}
              >
                <IconContext.Provider value={iconStyles}>
                  <GiHamburgerMenu />
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
      </div>
      {popupActive && <AuthenticationPopup setPopupActive={setPopupActive} />}
      {signInPopupActive && (
        <SignInPopup
          setSignInPopupActive={setSignInPopupActive}
          setPopupActive={setPopupActive}
          setBusinessPopup={setBusinessPopup}
          setForgotPassword={setForgotPassword}
        />
      )}
      {businessPopup && <BusinessSignup setPopupActive={setBusinessPopup} />}
      {forgotPassword && (
        <ForgotPasswordPopup setForgotPassword={setForgotPassword} />
      )}
    </header>
  );
}
