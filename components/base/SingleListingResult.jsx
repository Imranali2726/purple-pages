import { useMemo } from "react";
import { IconContext } from "react-icons";
import { MdOutlineLocationOn, MdOutlineElevator } from "react-icons/md";
import { FaRestroom, FaWheelchair } from "react-icons/fa";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";

export default function SingleListingResult() {
  const locationIcon = useMemo(
    () => ({
      className: "fill-primary text-primary pt-1 w-6 h-6",
    }),
    [],
  );
  const purpleIcon = useMemo(
    () => ({ className: "fill-primary text-primary w-5 h-5" }),
    [],
  );
  return (
    <div className="mb-6 md:mb-10">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-1 xl:grid-cols-[240px_1fr] 2xl:grid-cols-[290px_1fr]  ">
        <img
          src="https://picsum.photos/seed/picsum/295/278"
          alt=""
          className="w-full h-full lg:max-h-[300px] xl:max-h-full xl:h-full xl:max-w-[295px] object-cover object-center"
        />
        <div className="border flex-1 pt-7 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%] 2xl:grid-cols-[70%_30%] gap-4 px-6">
            <div>
              <h3 className="font-bold text-lg">GEMS Founder School</h3>
              <div className="mt-4 flex items-start">
                <div>
                  <IconContext.Provider value={locationIcon}>
                    <MdOutlineLocationOn />
                  </IconContext.Provider>
                </div>
                <p className="text-sm ml-2 max-w-[381px] text-[#737373]">
                  Suite 104, 1 Meadlake Place, Thorpe Lea Road, Egham, Surrey,
                  TW20 8HE, UK
                </p>
              </div>
              <div className="mt-4 text-[#737373]">
                <p className="text-sm leading-4">
                  1. Outstanding School rated by MoE
                </p>
                <p className="text-sm leading-4">
                  {" "}
                  2. Excellent Sporting Facilities
                </p>
                <p className="text-sm leading-4">
                  {" "}
                  3. Outstanding School rated by MoE
                </p>
              </div>
            </div>
            <div>
              <img
                src="/images/filter-logo.png"
                alt=""
                className="w-auto max-w-[100%]"
              />
              <div className="mt-4">
                <ul className="pl-8">
                  <li className="flex items-center gap-3 mb-2">
                    <div>
                      <IconContext.Provider value={purpleIcon}>
                        <FaRestroom />
                      </IconContext.Provider>
                    </div>
                    <span className="text-xs">Toilets</span>
                  </li>
                  <li className="flex items-center gap-3 mb-2">
                    <div>
                      <IconContext.Provider value={purpleIcon}>
                        <MdOutlineElevator />
                      </IconContext.Provider>
                    </div>
                    <span className="text-xs">Elevator</span>
                  </li>
                  <li className="flex items-center gap-3 mb-2">
                    <div>
                      <IconContext.Provider value={purpleIcon}>
                        <FaRestroom />
                      </IconContext.Provider>
                    </div>
                    <span className="text-xs">Toilets</span>
                  </li>
                  <li className="flex items-center gap-3 mb-2">
                    <div>
                      <IconContext.Provider value={purpleIcon}>
                        <FaWheelchair />
                      </IconContext.Provider>
                    </div>
                    <span className="text-xs">Wheel Chair</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-[60%_40%] 2xl:grid-cols-[70%_30%] gap-4 px-6 py-4 border-t">
            <div className="flex items-center gap-5">
              <div className="flex">
                <Rate value={5} />
              </div>
              <p className="text-[#737373] text-sm">Louise Dawson</p>
            </div>
            <div>
              <button
                type="button"
                className="bg-primary py-2 w-full rounded-md text-white font-bold text-sm max-w-[174px]"
              >
                Check Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
