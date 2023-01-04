import { FaHome, FaAngleRight } from "react-icons/fa";
import Link from "next/link";

export default function Breadcrumbs({ breadCrumbs }) {
  return (
    <div className="mb-2 md:mb-4 flex items-center gap-2">
      {breadCrumbs?.map((item, i) => {
        if (i === 0) {
          return (
            <Link href={item?.link}>
              <a className="flex items-center gap-2 invert">
                {" "}
                <FaHome /> <FaAngleRight />
              </a>
            </Link>
          );
        }
        if (!item?.link)
          return (
            <p className="text-white font-semibold text-sm md:text-base">
              {item?.label}
            </p>
          );
        return (
          <Link href={item?.link}>
            <a className="flex items-center gap-2 invert font-semibold text-sm md:text-base">
              {" "}
              {item?.label} <FaAngleRight />{" "}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
