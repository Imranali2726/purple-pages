import { SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import PropTypes from "prop-types";

export default function SliderSlide({ text, img, slug }) {
  return (
    <SplideSlide>
      <Link href={slug}>
        <a>
          <img
            src={img}
            alt={text}
            className="w-full max-h-[220px] object-cover object-center"
          />
          <div className="border border-t-none pt-8 px-5 pb-3">
            <h3 className="font-bold text-sm md:text-base lg:text-lg">
              {text}
            </h3>
          </div>
        </a>
      </Link>
    </SplideSlide>
  );
}

SliderSlide.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
