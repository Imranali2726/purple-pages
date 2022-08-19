import { SplideSlide } from "@splidejs/react-splide";
import PropTypes from "prop-types";

export default function SliderSlide({ text, img }) {
  return (
    <SplideSlide>
      <div>
        <img
          src={img}
          alt="Slider slide"
          className="w-full max-h-[220px] object-cover object-center"
        />
        <div className="border border-t-none pt-8 px-5 pb-3">
          <h3 className="font-bold text-sm md:text-base lg:text-lg">{text}</h3>
        </div>
      </div>
    </SplideSlide>
  );
}

SliderSlide.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
