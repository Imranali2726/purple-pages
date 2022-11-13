import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import Head from "next/head";
import { getCandidate } from "../../../../../../../services/apiCalls";

const contactIcon = {
  className: "fill-primary text-primary pt-1 w-6 h-6",
};

export default function Id({ data }) {
  const [mounted, setMounted] = useState(false);

  const links = [
    { label: "About", link: "#about" },
    { label: "Contact Information", link: "#contact-information" },
    { label: "Resume", link: "#resume" },
    { label: "Skills", link: "#skills" },
    // { label: "Salary Expectation", link: "#salary" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  function getImageSrc(src, anonymous) {
    if (src) {
      if (anonymous) {
        return "/images/image-placeholder.png";
      }
      return src;
    }
    return "/images/image-placeholder.png";
  }
  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <style>
          {`.signInBtn{
              background-color: #c999ef !important;
            }`}
        </style>
      </Head>
      <section className="internal-header-bg h-auto pb-8 md:h-[354px] pt-[120px] md:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="flex flex-col pp-container relative top-[50%] translate-y-[-50%]">
          <h1 className="capitalize text-xl xl:text-2xl 2xl:text-3xl text-white font-bold">
            {Number(data?.is_first_name_anonymous) === 1
              ? "*******"
              : data?.first_name}{" "}
            {Number(data?.is_last_name_anonymous) === 1
              ? "******"
              : data?.last_name}
          </h1>
          <div className="flex items-start mt-1 md:mt-4">
            <p className="text-base xl:text-lg text-white capitalize">
              {data?.title}
            </p>
          </div>
        </div>
      </section>
      <nav className="bg-[#F7F4FB]">
        <ul className="py-2 md:py-0 flex flex-col md:flex-row flex-wrap items-center pp-container gap-x-4 gap-y-0 md:gap-y-2 ">
          {links.map((item) => (
            <li key={item.label}>
              <Link href={item.link}>
                <a
                  className={` pb-2 md:py-3 xl:py-6 border-b-4 text-xs lg:text-sm xl:text-base inline-block hover:text-primary hover:border-primary ${
                    mounted && window.location.href.includes(item.link)
                      ? "border-primary text-primary"
                      : "border-transparent"
                  }`}
                >
                  {" "}
                  {item.label}{" "}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="pp-container my-6 md:my-11" id="about">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          Overview
        </h2>

        <div className="flex flex-col md:flex-row md:items-start gap-8 mt-2 md:mt-6 xl:mt-11">
          {data?.about_yourself && mounted ? (
            <div className="text-sm md:text-base xl:text-lg text-[#737373] md:leading-8 xl:leading-9 flex-1">
              {ReactHtmlParser(data?.about_yourself)}
            </div>
          ) : (
            <p className="text-sm md:text-base xl:text-lg text-[#737373] md:leading-8 xl:leading-9  flex-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a gall
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a gall.
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a gall
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          )}
          <div>
            <div className="w-full md:w-[284px]">
              <img
                src={getImageSrc(
                  data?.image?.original_url,
                  data?.is_photo_anonymous,
                )}
                alt=""
                className="w-full md:w-[284px] rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pp-container mt-8" id="contact-information">
        <div className="bg-[#F6F6F6] p-4 md:p-8">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Contact Information
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-[#737373] text-sm md:text-base 2xl:text-lg mt-10">
            <span className="flex items-center gap-2 ">
              {" "}
              <IconContext.Provider value={contactIcon}>
                <BsFillTelephoneFill />
              </IconContext.Provider>
              {data?.is_phone_anonymous ? "********" : data?.phone}
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-2 ">
              {" "}
              <IconContext.Provider value={contactIcon}>
                <HiMail />
              </IconContext.Provider>
              {data?.is_email_anonymous ? "*******@****.com" : data?.email}
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-2 ">
              {" "}
              <IconContext.Provider value={contactIcon}>
                <MdOutlineLocationOn />
              </IconContext.Provider>
              {data?.is_address_anonymous ? "Hidden" : data?.address}
            </span>
          </div>
        </div>
      </section>
      <section className="pp-container mt-8 md:mt-16" id="resume">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-base text-[#642CA9] md:text-lg lg:text-xxl xl:text-2xl font-bold uppercase">
              Educational Experience
            </h3>
            <div className="shadow-[0_0_6px_#00000029] mt-6 md:mt-10">
              {data?.user_education_history?.map((item) => (
                <div
                  className="mx-6 md:mx-10 border-b py-6 md:py-10"
                  key={`${item?.id} ${item?.name}`}
                >
                  <p className="md:text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4">
                    {item?.degree}
                  </p>
                  <p>
                    <span className="text-sm text-[#B9B9B9]">{item?.name}</span>
                    <span> / </span>
                    <span className="text-sm text-[#642CA9]">
                      {item?.start_date} -{" "}
                      {item?.is_current ? "Currently Enrolled" : item?.end_date}
                    </span>
                  </p>
                  <p className="text-[#737373] lg:text-lg mt-3">
                    {item?.others}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-base text-[#642CA9] md:text-lg lg:text-xxl xl:text-2xl font-bold uppercase">
              Working Experience
            </h2>
            <div className="shadow-[0_0_6px_#00000029] mt-6 md:mt-10">
              {data?.user_experience?.map((item) => (
                <div
                  className="mx-6 md:mx-10 border-b py-6 md:py-10"
                  key={`${item?.id} ${item?.name}`}
                >
                  <p className="md:text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4">
                    {item?.name}
                  </p>
                  <p>
                    <span className="text-sm text-[#B9B9B9]">
                      {item?.company_name}
                    </span>
                    <span> / </span>
                    <span className="text-sm text-[#642CA9]">
                      {item?.start_date} -{" "}
                      {item?.is_current ? "Currently Employed" : item?.end_date}
                    </span>
                  </p>
                  <p className="text-[#737373] lg:text-lg mt-3">
                    Uniquely incentivize process-centric systems for reliable
                    market. Authoritatively scale next generation collaboration.
                    Globally morph 24/365 e-commerce.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className=" bg-[#F6F6F6] mt-20 py-12" id="skills">
        <div className="pp-container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
              Skills
            </h2>
            <ul className="mt-10">
              {data?.user_skills?.length > 0 &&
                data?.user_skills?.map((skill) => (
                  <li
                    className="flex items-center gap-3 mb-4"
                    key={skill.id + skill.name}
                  >
                    <img src="/images/feature-green.svg" alt="" />
                    <p className="text-[#737373] text-sm lg:text-base xl:text-lg -mt-1">
                      {skill?.name}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
              Accessibility Need
            </h2>
            <ul className="mt-10">
              <li className="flex items-center gap-3 mb-4">
                <img src="/images/feature-green.svg" alt="" />
                <p className="text-[#737373] text-sm lg:text-base xl:text-lg -mt-1">
                  School Funded Leader of Students
                </p>
              </li>
              <li className="flex items-center gap-3 mb-4">
                <img src="/images/feature-green.svg" alt="" />
                <p className="text-[#737373] text-sm lg:text-base xl:text-lg -mt-1">
                  School Funded Leader of Students
                </p>
              </li>
              <li className="flex items-center gap-3 mb-4">
                <img src="/images/feature-green.svg" alt="" />
                <p className="text-[#737373] text-sm lg:text-base xl:text-lg -mt-1">
                  School Funded Leader of Students
                </p>
              </li>
              <li className="flex items-center gap-3 mb-4">
                <img src="/images/feature-green.svg" alt="" />
                <p className="text-[#737373] text-sm lg:text-base xl:text-lg -mt-1">
                  School Funded Leader of Students
                </p>
              </li>
              <li className="flex items-center gap-3 mb-4">
                <img src="/images/feature-green.svg" alt="" />
                <p className="text-[#737373] text-sm lg:text-base xl:text-lg -mt-1">
                  School Funded Leader of Students
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await getCandidate(`candidates/${context.query.id}`);
    return {
      props: {
        data: res.data.data,
      },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}
