import { SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { BsFillTelephoneFill, BsFacebook, BsTwitter } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import { MdOutlineWeb } from "react-icons/md";
import { IconContext } from "react-icons";
import Slider from "../base/Slider";
import { FeaturedSlider } from "../../pages";
import AccessibilityFeaturerContainer from "../features/AccessibilityFeaturerContainer";
// import {
//   schoolService,
//   inclusion,
//   therapy,
// } from "../../fakeData/accessibilityFeatures";
import {
  getServiceFeatures,
  featuredEducations,
} from "../../services/apiCalls";
import SingleFeature from "../features/SingleFeature";
// import ReviewSlide from "../base/ReviewSlide";

const addressIcons = { className: "fill-primary h-6 w-6" };

function EducationTemplate({ mounted, data, accessbilityFeatures }) {
  const [servicesFeatures, setServicesFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [educations, setEducations] = useState([]);
  const [educationError, setEducationError] = useState("");
  const images = [
    {
      id: 0,
      link: "https://picsum.photos/456/281",
    },
    {
      id: 1,
      link: "https://picsum.photos/456/281",
    },
    {
      id: 2,
      link: "https://picsum.photos/456/281",
    },
    {
      id: 3,
      link: "https://picsum.photos/456/281",
    },
  ];
  const links = [
    { label: "Overview", link: "#overview" },
    { label: "School Information", link: "#school-information" },
    { label: "Gallery", link: "#gallery" },
    { label: "Inclusion Highs", link: "#inclusion-highs" },
    { label: "Accessibility Features", link: "#accessibility-features" },
    { label: "Standard School Service", link: "#standard_school_service" },
    { label: "Inclusion Accreditation", link: "#inclusion_accreditation" },
    { label: "Therapy", link: "#therapy" },
  ];
  async function getServices() {
    const res = await getServiceFeatures("services");
    setServicesFeatures(res.data.data);
  }

  async function getFeaturedEducations() {
    setIsLoading(true);
    try {
      const res = await featuredEducations("educations?feature=1");
      setEducations(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setEducationError(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (servicesFeatures.length <= 0) getServices();
    if (educations?.length <= 0) getFeaturedEducations();
  }, []);

  return (
    <>
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
      <section className="pp-container my-6 md:my-11" id="overview">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          Overview
        </h2>

        {data?.content && mounted ? (
          <div className="text-sm md:text-base xl:text-lg text-[#737373] mt-2 md:mt-6 xl:mt-11 md:leading-8 xl:leading-9">
            {ReactHtmlParser(data?.content)}
          </div>
        ) : (
          <p className="text-sm md:text-base xl:text-lg text-[#737373] mt-2 md:mt-6 xl:mt-11 md:leading-8 xl:leading-9">
            `Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a gall Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry&apos;s standard dummy text ever
            since the 1500s, when an unknown printer took a gall. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a gall Lorem Ipsum is simply
            dummy text of the printing and typesetting industry.`
          </p>
        )}
      </section>

      <section className="bg-[#F6F6F6]" id="school-information">
        <div className="pp-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="py-11">
              <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                School Information
              </h3>
              <ul className="mt-11">
                <li className="flex items-center gap-6 mb-6">
                  <IconContext.Provider value={addressIcons}>
                    <BsFillTelephoneFill />
                  </IconContext.Provider>
                  <p className="text-[#737373] text-sm md:text-base lg:text-lg xl:text-xl font-medium">
                    {data?.contact_no ?? "+971 4 519 5222"}
                  </p>
                </li>
                <li className="flex items-center gap-6 mb-6">
                  <IconContext.Provider value={addressIcons}>
                    <FaEnvelope />
                  </IconContext.Provider>
                  <p className="text-[#737373] text-sm md:text-base lg:text-lg xl:text-xl font-medium">
                    {data?.email ?? "gfs@gemsedu.com"}
                  </p>
                </li>
                <li className="flex items-center gap-6 mb-6">
                  <IconContext.Provider value={addressIcons}>
                    <MdOutlineWeb />
                  </IconContext.Provider>
                  <p className="text-[#737373] text-sm md:text-base lg:text-lg xl:text-xl font-medium">
                    {data?.web_address ?? "www.gemsfounderschool-dubai.com"}
                  </p>
                </li>
                <li className="flex items-center gap-6 mb-6">
                  <IconContext.Provider value={addressIcons}>
                    <BsFacebook />
                  </IconContext.Provider>
                  <p className="text-[#737373] text-sm md:text-base lg:text-lg xl:text-xl font-medium">
                    @gfsfounderdubai
                  </p>
                </li>
                <li className="flex items-center gap-6 mb-6">
                  <IconContext.Provider value={addressIcons}>
                    <BsTwitter />
                  </IconContext.Provider>
                  <p className="text-[#737373] text-sm md:text-base lg:text-lg xl:text-xl font-medium">
                    @gfsfounderdubai
                  </p>
                </li>
              </ul>
            </div>
            {/* <div className="overflow-hidden"></div> */}
          </div>
        </div>
      </section>
      <section className="my-10" id="gallery">
        <h3 className="pp-container text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          Gallery
        </h3>
        <div className="mt-10">
          <Slider
            options={{
              type: "loop",
              perPage: 4,
              gap: "2rem",
              pagination: false,
              arrows: true,
              classes: {
                arrow: "splide__arrow custom-arrows",
                prev: "splide__arrow--prev custom-prev-arrow",
                next: "splide__arrow--next custom-next-arrow",
              },
              breakpoints: {
                1535: {
                  perPage: 3,
                },
                1024: {
                  perPage: 2,
                },
                650: {
                  perPage: 1,
                },
              },
            }}
          >
            {data?.images.length
              ? data?.images.map((item) => (
                  <SplideSlide key={item.id}>
                    <img
                      src={item.original_url}
                      // src={item.responsive_images.preview.base64svg}
                      alt=""
                      className="w-full h-auto max-h-[280px] object-cover object-center"
                    />
                  </SplideSlide>
                ))
              : images.map((item) => (
                  <SplideSlide key={item.id}>
                    <img
                      src={item.original_url}
                      // src={item.responsive_images.preview.base64svg}
                      alt=""
                      className="w-full h-auto max-h-[280px] object-cover object-center"
                    />
                  </SplideSlide>
                ))}
          </Slider>
        </div>
      </section>
      <section className="pp-container lg:mt-20 " id="inclusion-highs">
        <div className="text-center bg-[#F1ECF7] p-12 z-10 relative overflow-hidden">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Inclusion Highs
          </h3>
          <div className="mt-7 text-[#737373] text-base md:text-lg lg:text-xl xl:text-2xl font-semibold italic">
            {ReactHtmlParser(data?.inclusion_heighs)}
          </div>
          {/* <ul className="mt-7">
            <li className="text-[#737373] text-base md:text-lg lg:text-xl xl:text-2xl font-semibold italic">
              Outstanding School rated by MoE
            </li>
            <li className="text-[#737373] text-base md:text-lg lg:text-xl xl:text-2xl font-semibold italic">
              Outstanding School rated by MoE
            </li>
            <li className="text-[#737373] text-base md:text-lg lg:text-xl xl:text-2xl font-semibold italic">
              Outstanding School rated by MoE
            </li>
          </ul> */}
          <div className="absolute rounded-full bg-[#E2D8EF] z-[-1] aspect-square w-[80px] top-10 right-[20%]" />
          <div className="absolute rounded-full bg-[#E2D8EF] z-[-1] aspect-square w-[180px] -bottom-10 -left-10" />
          <div className="absolute rounded-full bg-[#E2D8EF] z-[-1] aspect-square w-[180px] -bottom-10 -right-10" />
        </div>
      </section>
      <section
        className="pp-container my-8 lg:my-14"
        id="accessibility-features"
      >
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Accessibility Features
          </h3>
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 xl:gap-y-10">
              {accessbilityFeatures?.map((item) => (
                <AccessibilityFeaturerContainer
                  name={`${item.id}. ${item?.name}`}
                  features={item?.sub_accessibility_features}
                  key={item.id}
                  subAccessibilityFeatures={
                    data?.sub_education_accessibilty_features
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {servicesFeatures?.map((service) => (
        <section className=" py-10" key={service.key} id={service.key}>
          <div className="pp-container">
            <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
              {service.name}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-6 xl:gap-y-10 gap-x-8 mt-6 lg:mt-14">
              {service?.sub_services.map((item) => (
                <SingleFeature
                  data={item}
                  key={item.id}
                  subAccessibilityFeatures={data?.education_services}
                />
              ))}
            </ul>
          </div>
        </section>
      ))}
      {/* <section className="pp-container my-10">
        <h3 className="font-bold text-lg md:text-xl lg:text-2xl">Review</h3>
        <div className="mt-10">
          <Slider
            options={{
              type: "loop",
              perPage: 2,
              gap: "2rem",
              pagination: false,
              arrows: false,
              breakpoints: {
                767: {
                  perPage: 1,
                },
              },
            }}
          >
            <SplideSlide>
              <div className="p-6 -m-4">
                <ReviewSlide />
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="p-6 -m-4">
                <ReviewSlide />
              </div>
            </SplideSlide>
          </Slider>
          <textarea
            name="review"
            id="review"
            rows="4"
            placeholder="Leave a comment..."
            className="mt-6 w-full border-none bg-[#F1ECF7] rounded-2xl shadow-[0_3px_6px_#00000029] resize-none text-lg py-8 px-9"
          />
          <div className="text-end mt-4">
            <button
              type="button"
              className="w-full md:w-auto py-3 px-10 bg-primary rounded-lg text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </section> */}
      {educations?.length > 0 && (
        <section className="pp-container ">
          <div className="mt-12 md:mt-[65px] xl:mt-[128px]">
            <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
              Similar Schools
            </h3>
            <div className="mt-4 md:mt-8">
              <FeaturedSlider
                educationError={educationError}
                educations={educations}
                isLoading={isLoading}
                name="/educations"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default EducationTemplate;
