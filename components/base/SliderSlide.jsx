import { SplideSlide } from "@splidejs/react-splide";

export default function SliderSlide() {
  return (
    <SplideSlide>
      <div>
        <img
          src="/images/img1.jpg"
          alt=""
          className="w-full max-h-[220px] object-cover object-center"
        />
        <div className="border border-t-none pt-8 px-5 pb-3">
          <h3 className="font-bold text-sm md:text-base lg:text-lg">
            ELA Training Services, UK
          </h3>
        </div>
      </div>
    </SplideSlide>
  );
}
