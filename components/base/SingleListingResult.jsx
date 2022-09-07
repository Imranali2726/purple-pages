import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { MdOutlineLocationOn, MdOutlineElevator } from "react-icons/md";
import { FaRestroom, FaWheelchair } from "react-icons/fa";
import Rate from "rc-rate";
import Link from "next/link";

const locationIcon = {
  className: "fill-primary text-primary pt-1 w-6 h-6",
};
const purpleIcon = { className: "fill-primary text-primary w-5 h-5" };

export default function SingleListingResult({ singleListData }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="mb-6 md:mb-10">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-1 xl:grid-cols-[240px_1fr] 2xl:grid-cols-[290px_1fr]  ">
        <img
          src={
            singleListData?.image ?? "https://picsum.photos/seed/picsum/295/278"
          }
          alt=""
          className="w-full h-full lg:max-h-[300px] xl:max-h-full xl:h-full xl:max-w-[295px] object-cover object-center"
        />
        <div className="border flex-1 pt-6 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%] 2xl:grid-cols-[70%_30%] gap-4 px-6">
            <div>
              <h3 className="font-bold text-lg">{singleListData?.name}</h3>
              <div className="mt-4 flex items-start">
                <div>
                  <IconContext.Provider value={locationIcon}>
                    <MdOutlineLocationOn />
                  </IconContext.Provider>
                </div>
                <p className="text-sm ml-2 max-w-[381px] text-[#737373]">
                  {singleListData?.address ??
                    "Al Barsha - Al Barsha South - Dubai - United Arab Emirates"}
                </p>
              </div>
              {mounted && (
                <div
                  className="mt-4 text-[#737373] text-sm leading-4"
                  dangerouslySetInnerHTML={{
                    __html: singleListData?.inclusion_heighs,
                  }}
                />
              )}
            </div>
            <div>
              <img
                src={singleListData?.logo}
                alt=""
                className="w-auto max-w-[150px] h-auto w-auto max-h-[40px]"
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
          <div className="mt-4 xl:mt-2 2xl:mt-0 grid grid-cols-1 md:grid-cols-[60%_40%] 2xl:grid-cols-[70%_30%] gap-4 px-6 py-4 border-t">
            <div className="flex items-center gap-5">
              <div className="flex">
                <Rate value={5} />
              </div>
              <p className="text-[#737373] text-sm">Louise Dawson</p>
            </div>
            <div>
              <Link href={`/listing/${singleListData?.slug}`}>
                <a className="bg-primary py-2 w-full rounded-md text-white font-bold text-sm max-w-[174px] inline-block text-center hover:bg-[#2CB579] transition-colors">
                  {" "}
                  Check Details{" "}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
