import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { MdLocationPin } from "react-icons/md";
import Head from "next/head";

import {
  detailPageData,
  getAccessibilityFeature,
} from "../../services/apiCalls";
import EducationTemplate from "../../components/templates/EducationTemplate";
import JobsTemplate from "../../components/templates/JobsTemplate";

const locationIcon = { className: "fill-white w-6 h-6" };

export default function Slug({ data }) {
  const [mounted, setMounted] = useState(false);
  // const [data, setData] = useState(null);
  const router = useRouter();
  const [accessbilityFeatures, setAccessibilityFeatures] = useState([]);

  async function getAccessibilityFeatures() {
    const res = await getAccessibilityFeature("accessibility-features");
    setAccessibilityFeatures(res.data.data);
  }

  useEffect(() => {
    setMounted(true);
    if (accessbilityFeatures.length <= 0) getAccessibilityFeatures();
    if (!data) router.push("/404");
  }, [router.query.slug]);

  return (
    <>
      <Head>
        <title>
          {" "}
          {parseInt(data?.is_name_anonymous, 10) === 1
            ? "Anonymous"
            : data?.name}
        </title>
        <style>
          {`.signInBtn{
              background-color: #c999ef !important;
            }`}
        </style>
      </Head>
      <section className="internal-header-bg h-auto pb-8 md:h-[354px] pt-[120px] md:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="flex items-center h-full pp-container">
          <div className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-4 lg:gap-9 -mx-4 md:mx-0">
            <div>
              <img
                src={
                  data?.logo ?? data?.image ?? "/images/filter-logo-whitebg.jpg"
                }
                alt=""
              />
            </div>
            <div>
              <h1 className="capitalize text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white font-bold">
                {parseInt(data?.is_name_anonymous, 10) === 1
                  ? "Anonymous"
                  : data?.name}
              </h1>
              <div className="flex items-start mt-1 md:mt-4">
                <div>
                  {" "}
                  <IconContext.Provider value={locationIcon}>
                    <MdLocationPin />
                  </IconContext.Provider>
                </div>
                <p className="text-sm lg:text-base xl:text-lg text-white capitalize">
                  {parseInt(data?.is_address_anonymous, 10) === 1
                    ? "Anonymous"
                    : data?.address ??
                      "Al Barsha - Al Barsha South - Dubai - United Arab Emirates"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {router.query.service === "educations" && (
        <EducationTemplate
          mounted={mounted}
          data={data}
          accessbilityFeatures={accessbilityFeatures}
        />
      )}
      {router.query.service === "jobs" && (
        <JobsTemplate mounted={mounted} data={data} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await detailPageData(
      `${context.query.service}/${context.query.slug}`,
    );
    return {
      props: {
        data: res.data.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}
