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
import Breadcrumbs from "../../components/features/Breadcrumbs";

const locationIcon = { className: "fill-white w-6 h-6" };

export default function Slug({ data }) {
  const [mounted, setMounted] = useState(false);
  // const [data, setData] = useState(null);
  const router = useRouter();
  const [accessbilityFeatures, setAccessibilityFeatures] = useState([]);
  const [link, setLink] = useState(null);

  async function getAccessibilityFeatures() {
    const res = await getAccessibilityFeature("accessibility-features");
    setAccessibilityFeatures(res.data.data);
  }

  const breadCrumbs = [
    { link: "/", label: "home" },
    { link, label: "Listing" },
    {
      label: data?.name,
    },
  ];

  // async function getData() {
  //   try {
  //     const res = await detailPageData(
  //       `${router.query.service}/${router.query.slug}`,
  //     );
  //     setData(res.data.data);
  //   } catch (error) {
  //     router.push("/404");
  //   }
  // }

  useEffect(() => {
    setMounted(true);
    if (accessbilityFeatures.length <= 0) getAccessibilityFeatures();
    // if (!data && router.query.service && router.query.slug) getData();
    if (!link && typeof window !== "undefined") {
      setLink(localStorage.getItem("link"));
    }
  }, [router.query.slug]);

  useEffect(() => {
    function routerChange() {
      if (typeof window !== "undefined") {
        setTimeout(() => {
          localStorage.removeItem("link");
        }, 1000);
      }
    }

    router.events.on("routeChangeStart", routerChange);
    return () => {
      router.events.off("routeChangeStart", routerChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{data?.name} | Purple Pages</title>
        <style>
          {`.signInBtn{
              background-color: #c999ef !important;
            }`}
        </style>
      </Head>
      <section className="internal-header-bg h-auto pb-8 md:h-[260px] lg:h-[300px] xl:h-[354px] pt-[70px] lg:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="pt-8">
          <div className="pp-container mb-4 lg:mb-8">
            <Breadcrumbs breadCrumbs={breadCrumbs} />
          </div>
          <div className="flex items-center h-full pp-container">
            <div className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-4 lg:gap-9 -mx-4 md:mx-0">
              <div className="flex justify-center">
                <img
                  src={
                    data?.logo ??
                    data?.image ??
                    "/images/filter-logo-whitebg.jpg"
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
        </div>
      </section>
      {router.query.service === "educations" && (
        <EducationTemplate
          mounted={mounted}
          data={data}
          accessbilityFeatures={accessbilityFeatures}
        />
      )}
      {router.query.service === "employments" && (
        <JobsTemplate mounted={mounted} data={data} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { service, slug } = context.query;
  try {
    const res = await detailPageData(`${service}/${slug}`);

    return {
      props: {
        data: res.data.data,
      },
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}
