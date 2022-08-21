import { IconContext } from "react-icons";
import { RiInformationFill } from "react-icons/ri";
import Link from "next/link";
import SingleFeature from "./SingleFeature";

const tooltipIcon = { className: "fill-[#DFDFDF] w-5 h-5" };

export default function AccessibilityFeaturerContainer({ name, features }) {
  return (
    <div>
      <div>
        <p className="p-3 bg-[#DFDFDF] text-[#737373] rounded-md font-semibold inline-block text-base xl:text-xl 2xl:text-[22px]">
          {name}
        </p>
      </div>
      <ul className="mt-4 lg:mt-8">
        {features.map((item) => (
          <div
            className="flex items-start gap-2 mb-4 lg:mb-6 xl:mb-8"
            key={item.label}
          >
            <SingleFeature data={item} />
            <div className="relative group">
              <IconContext.Provider value={tooltipIcon}>
                <RiInformationFill />
              </IconContext.Provider>
              <div className="hidden group-hover:block absolute bg-[#F1ECF7] p-3 w-52 lg:w-64 -right-4 z-20 rounded-lg">
                <p className="text-sm lg:text-base">{item.tooltip}</p>
                <div className="text-end">
                  <Link href="#">
                    <a className="text-primary font-semibold mt-5 inline-block">
                      {" "}
                      Learn More{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
