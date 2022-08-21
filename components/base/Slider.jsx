import { Splide } from "@splidejs/react-splide";

export default function Slider({ options, children }) {
  return <Splide options={options}>{children}</Splide>;
}

Slider.defaultProps = {
  options: {
    type: "loop",
    perPage: 4,
    gap: "2rem",
    pagination: false,
    arrows: false,
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
  },
};
