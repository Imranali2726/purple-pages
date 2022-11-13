import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { MdOutlineLocationOn, MdMonetizationOn } from "react-icons/md";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import { startCase } from "lodash";
import { AiFillPhone } from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { BsBriefcaseFill } from "react-icons/bs";

import { useRouter } from "next/router";
import SingleFeaturesResult from "./SingleFeaturesResult";

const locationIcon = {
  className: "fill-primary text-primary pt-1 w-6 h-6",
};

export default function SingleListingResult({ singleListData }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="mb-6 md:mb-10">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-1 xl:grid-cols-[240px_1fr] 2xl:grid-cols-[290px_1fr]  border">
        {router.query.listing === "find-a-candidate" ? (
          <img
            src={
              singleListData?.image?.original_url ??
              "/images/image-placeholder.png"
            }
            alt="Placeholder for Candidate"
            className={`w-full h-full lg:max-h-[300px] xl:max-h-full xl:h-full xl:max-w-[295px] ${
              router.query.service === "employments"
                ? "object-contain p-4"
                : "object-cover"
            } object-center`}
          />
        ) : (
          <img
            src={
              singleListData?.image || singleListData?.image !== ""
                ? singleListData?.image
                : "/images/image-placeholder.png"
            }
            alt={
              singleListData?.image || singleListData?.image !== ""
                ? singleListData?.name
                : "Placeholder"
            }
            className={`w-full h-full lg:max-h-[300px] xl:max-h-full xl:h-full xl:max-w-[295px] ${
              router.query.service === "employments"
                ? "object-contain p-4"
                : "object-cover"
            } object-center`}
          />
        )}
        <div className="border-l flex-1 pt-6 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%] 2xl:grid-cols-[70%_30%] gap-8 px-6">
            <div>
              <h3 className="font-bold text-lg">{singleListData?.name}</h3>
              {router.query.listing === "find-a-candidate" && (
                <p className="text-sm text-[#737373] my-1">
                  {singleListData?.title ?? "Frontend Developer"}
                </p>
              )}
              {router.query.listing === "find-a-candidate" && (
                <p className="text-sm text-[#737373] mt-2">
                  {singleListData?.about_yourself ??
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
              )}
              {router.query.listing !== "find-a-candidate" && (
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
              )}
              {mounted && router.query.service === "educations" && (
                <>
                  <div className="mt-1 text-lg font-semibold text-[#642CA9]">
                    Purple Highlights
                  </div>
                  <div className="mt-2 text-[#737373] text-sm leading-4 pl-4 inclusion">
                    {ReactHtmlParser(singleListData?.inclusion_heighs)}
                  </div>
                </>
              )}

              {mounted && router.query.service === "employments" && (
                <div className="mt-4 text-[#737373] text-sm leading-4">
                  {ReactHtmlParser(singleListData?.sub_title)}
                </div>
              )}
            </div>
            <div>
              {router.query.service === "educations" && (
                <>
                  <img
                    src={singleListData?.logo}
                    alt=""
                    className="max-w-[150px] h-auto w-auto max-h-[40px]"
                  />
                  <SingleFeaturesResult />
                </>
              )}
              {router.query.service === "employments" &&
                router.query.listing === "find-a-job" && (
                  <ul className="mt-4">
                    <li className="mb-2 text-[#737373] text-sm capitalize flex items-center gap-2">
                      <IconContext.Provider value={locationIcon}>
                        <BsBriefcaseFill />
                      </IconContext.Provider>
                      {startCase(singleListData?.job_type)}
                    </li>
                    <li className="mb-2 text-[#737373] text-sm flex items-center gap-2">
                      <IconContext.Provider value={locationIcon}>
                        <MdMonetizationOn />
                      </IconContext.Provider>
                      {singleListData?.salary ?? "N/A"}
                    </li>
                  </ul>
                )}

              {router.query.service === "candidates" &&
                router.query.listing === "find-a-candidate" && (
                  <ul>
                    <li className="text-sm text-[#737373] mt-2 flex items-center gap-2">
                      <IconContext.Provider value={locationIcon}>
                        <AiFillPhone />
                      </IconContext.Provider>
                      {singleListData?.phone}
                    </li>
                    <li className="text-sm text-[#737373] mt-2 flex items-center gap-2">
                      <IconContext.Provider value={locationIcon}>
                        <HiMail />
                      </IconContext.Provider>
                      {singleListData?.email}
                    </li>
                    <li className="text-sm text-[#737373] mt-2 flex items-center gap-2">
                      <IconContext.Provider value={locationIcon}>
                        <MdOutlineLocationOn />
                      </IconContext.Provider>
                      {singleListData?.address}
                    </li>
                  </ul>
                )}
            </div>
          </div>
          <div className="mt-4 xl:mt-4 grid items-center grid-cols-1 md:grid-cols-[60%_40%] 2xl:grid-cols-[70%_30%] gap-4 px-6 py-4 border-t">
            {router.query.service === "educations" && (
              <div className="flex items-center gap-5">
                {/* <div className="flex">
                  <Rate value={5} />
                </div>
                <p className="text-[#737373] text-sm">Louise Dawson</p> */}
              </div>
            )}
            {(router.query.service === "employments" ||
              router.query.service === "candidates") && (
              <p className="text-[#737373] text-sm ">
                {singleListData?.created_at}
              </p>
            )}
            <div>
              {router.query.listing !== "find-a-candidate" ? (
                <Link href={`/${router.query.service}/${singleListData?.slug}`}>
                  <a className="bg-primary py-2 w-full rounded-md text-white font-bold text-sm max-w-[174px] inline-block text-center hover:bg-[#2CB579] transition-colors">
                    {" "}
                    Check Details{" "}
                  </a>
                </Link>
              ) : (
                <Link
                  href={`${window.location.pathname}/user/${singleListData?.id}`}
                >
                  <a className="bg-primary py-2 w-full rounded-md text-white font-bold text-sm max-w-[174px] inline-block text-center hover:bg-[#2CB579] transition-colors">
                    {" "}
                    Check Details{" "}
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
