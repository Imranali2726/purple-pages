import { useState, useEffect } from "react";
import Head from "next/head";
import Slider from "../components/base/Slider";
import SliderSlide from "../components/base/SliderSlide";
import SearchFilter from "../components/filter/SearchFilter";
import { featuredEducations, featuredJobs } from "../services/apiCalls";

export default function Home() {
  const [isLoading, setIsLoading] = useState({
    educations: false,
    jobs: false,
  });
  const [educations, setEducations] = useState([]);
  const [educationError, setEducationError] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobsError, setJobsError] = useState("");

  async function getFeaturedEducations() {
    setIsLoading((p) => ({ ...p, educations: true }));
    try {
      const res = await featuredEducations("educations?features=1");
      setEducations(res.data.data);
      setIsLoading((p) => ({ ...p, educations: false }));
    } catch (error) {
      setEducationError(error.message);
      setIsLoading((p) => ({ ...p, educations: false }));
    }
  }
  async function getFeaturedJobs() {
    setIsLoading((p) => ({ ...p, jobs: true }));
    try {
      const res = await featuredJobs("jobs?features=1");
      setJobs(res.data.data);
      setIsLoading((p) => ({ ...p, jobs: false }));
    } catch (error) {
      setJobsError(error.message);
      setIsLoading((p) => ({ ...p, jobs: false }));
    }
  }

  useEffect(() => {
    getFeaturedEducations();
    getFeaturedJobs();
  }, []);
  return (
    <>
      <Head>
        <title>Purple Pages | Home</title>
      </Head>
      <section className="bg-image flex items-center justify-center h-screen max-h-[800px] lg:max-h-[100%] pt-[65px] lg:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="max-w-[300px] md:max-w-[720px] lg:max-w-[991px] xl:max-w-[1200px] mx-auto  items-center justify-between">
          <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Access to Society
          </h1>
          <p className="text-white mt-6 text-center max-w-[560px] mx-auto leading-7 md:leading-9">
            Enter the information in the search and get your personalized
            experience throughout the site.
          </p>
          <div className="mt-[45px] md:mt-[70px] lg:-mx-0 xl:-mx-8">
            <SearchFilter />
          </div>
        </div>
      </section>
      {educations?.length > 0 && (
        <section className="pp-container ">
          <div className="mt-8 md:mt-[80px] xl:mt-[152px]">
            <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
              Featured Educations
            </h2>
            <div className="mt-4 md:mt-8">
              <FeaturedSlider
                educationError={educationError}
                educations={educations}
                isLoading={isLoading.educations}
                name="educations"
              />
            </div>
          </div>
        </section>
      )}
      {jobs.length > 0 && (
        <section className="pp-container ">
          <div className="mt-12 md:mt-[65px] xl:mt-[128px]">
            <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
              Featured Jobs
            </h2>
            <div className="mt-4 md:mt-8">
              <FeaturedSlider
                educationError={jobsError}
                educations={jobs}
                isLoading={isLoading.jobs}
                name="jobs"
              />
            </div>
          </div>
        </section>
      )}
      <section className="bg-primary mt-8 md:mt-[90px] py-11 xl:py-[63px] 2xl:py-[83px]">
        <div className="pp-container">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] lg:gap-14 xl:grid-cols-[450px_1fr] xl:gap-[80px] 2xl:grid-cols-[590px_1fr] 2xl:gap-[140px] items-center">
            <img
              src="/images/img5.jpg"
              alt="Events and Updates"
              className="w-full"
            />
            <div className="text-center">
              <h3 className="text-white text-3xl font-bold">
                Events & Updates
              </h3>
              <p className="text-sm max-w-[690px] mx-auto mt-4 lg:mt-8 text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printe.
              </p>
              <button
                type="button"
                className="text-base md:text-lg lg:text-xl bg-white text-primary py-3 px-4 lg:py-4 lg:px-5 rounded-[16px] font-semibold mt-6 lg:mt-8 hover:bg-transparent border border-transparent hover:border-white hover:text-white transition "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="pp-container ">
        <div className="mt-8 md:mt-[80px] xl:mt-[152px]">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
            Medical/Health facilities
          </h2>
          <div className="mt-4 md:mt-8">
            <Slider>
              {slider3.map((item) => (
                <SliderSlide text={item.text} img={item.img} key={item.text} />
              ))}
            </Slider>
          </div>
        </div>
      </section> */}
      {/* <section className="pp-container ">
        <div className="mt-12 md:mt-[65px] xl:mt-[128px]">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
            Adult Learning facilities
          </h2>
          <div className="mt-4 md:mt-8">
            <Slider>
              {slider4.map((item) => (
                <SliderSlide text={item.text} img={item.img} key={item.text} />
              ))}
            </Slider>
          </div>
        </div>
      </section> */}
    </>
  );
}

export function FeaturedSlider({
  isLoading,
  educations,
  educationError,
  name,
}) {
  if (isLoading) {
    return <p className="my-2">Loading...</p>;
  }

  if (educationError) {
    return (
      <div>
        {educationError.length && (
          <p className="text-red-500 text-sm my-2">{educationError}</p>
        )}
      </div>
    );
  }

  return (
    <Slider>
      {educations?.length > 0 ? (
        educations?.map((item) => (
          <SliderSlide
            text={item.name}
            img={
              item.images[0]?.original_url ?? "/images/image-placeholder.png"
            }
            key={item.id}
            slug={`${name}/${item?.slug}`}
          />
        ))
      ) : (
        <p className="text-red-500 text-sm my-2">No data found.</p>
      )}
    </Slider>
  );
}
