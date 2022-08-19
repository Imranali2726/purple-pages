import { Splide } from "@splidejs/react-splide";

export default function Slider({ children }) {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 4,
        gap: "2rem",
        pagination: false,
        arrows: false,
        breakpoints: {
          1536: {
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
      {children}
    </Splide>
  );
}
