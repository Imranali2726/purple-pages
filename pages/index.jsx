import Slider from "../components/base/Slider";
import SliderSlide from "../components/base/SliderSlide";
import SearchFilter from "../components/filter/SearchFilter";
import { slider1, slider2, slider3, slider4 } from "../fakeData/homepage";

export default function Home() {
  return (
    <>
      <section className="bg-image flex items-center justify-center h-screen max-h-[800px] lg:max-h-[100%] pt-[65px] lg:pt-0">
        <div className=" md:max-w-[720px] lg:max-w-[991px] xl:max-w-[1100px] max-w-[300px] mx-auto  items-center justify-between">
          <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Access to Society
          </h1>
          <p className="text-white mt-6 text-center max-w-[560px] mx-auto leading-7 md:leading-9">
            Enter the information in the search and get your personalized
            experience throughout the site.
          </p>
          <div className="mt-[45px] md:mt-[70px]">
            <SearchFilter />
          </div>
        </div>
      </section>
      <section className="pp-container ">
        <div className="mt-8 md:mt-[80px] xl:mt-[152px]">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
            Education Facilities
          </h2>
          <div className="mt-4 md:mt-8">
            <Slider>
              {slider1.map((item) => (
                <SliderSlide text={item.text} img={item.img} key={item.text} />
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="pp-container ">
        <div className="mt-12 md:mt-[65px] xl:mt-[128px]">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
            Leisure/Hospitality facilities
          </h2>
          <div className="mt-4 md:mt-8">
            <Slider>
              {slider2.map((item) => (
                <SliderSlide text={item.text} img={item.img} key={item.text} />
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="bg-primary mt-8 md:mt-[90px] py-11 xl:py-[63px] 2xl:py-[83px]">
        <div className="pp-container">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] lg:gap-14 xl:grid-cols-[450px_1fr] xl:gap-[80px] 2xl:grid-cols-[590px_1fr] 2xl:gap-[140px] items-center">
            <img src="/images/img5.jpg" alt="" className="w-full" />
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
      <section className="pp-container ">
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
      </section>
      <section className="pp-container ">
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
      </section>
    </>
  );
}
