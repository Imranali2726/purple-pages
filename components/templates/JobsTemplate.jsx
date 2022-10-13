import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { MdOutlineWeb } from "react-icons/md";
import { IconContext } from "react-icons";
import { BsLinkedin } from "react-icons/bs";
import ReactHtmlParser from "react-html-parser";
import { startCase } from "lodash";
import { getDate } from "../../services/utils";

const addressIcons = { className: "fill-primary h-6 w-6" };
function JobsTemplate({ mounted, data }) {
  const links = [
    { label: "Overview", link: "#overview" },
    { label: "Job Description", link: "#job-description" },
    { label: "Additional Information", link: "#additional-information" },
  ];
  return (
    <div className="-mb-12 md:-mb-[80px] lg:-mb-[143px]">
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
      <section className="bg-[#F7F4FB]" id="overview">
        <div className="pp-container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left w-full flex items-center md:w-auto justify-between md:justify-start md:gap-6">
              <h2 className="font-bold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl capitalize">
                {parseInt(data?.is_name_anonymous, 10) === 1
                  ? "Anonymous"
                  : data?.name}
              </h2>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg">
                <span className="font-semibold text-sm md:text-base lg:text-lg xl:text-xl">
                  Posted:
                </span>{" "}
                {data?.created_at}
              </p>
            </div>
            <div className="flex items-center text-left w-full md:w-auto justify-between md:justify-start md:gap-6">
              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold">
                Apply Before
              </h3>
              <button
                className="bg-[#2CB579] text-white py-3 px-4 rounded-md text-xs md:text-base lg:text-lg xl:text-xl font-bold"
                type="button"
              >
                {parseInt(data?.is_apply_date_anonymous, 10) === 1
                  ? " ????"
                  : getDate(data?.apply_date, "mmm dd,yyyy")}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-8 gap-y-4">
            <div className="flex items-center w-full md:w-1/2 lg:w-4/12">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Sector: &nbsp;
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl ">
                {data?.sectors?.map((item, i) =>
                  i === data.sectors.length - 1 ? item.name : `${item.name}, `,
                )}
              </p>
            </div>
            <div className="flex items-center w-full md:w-1/2 lg:w-4/12">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Gender: &nbsp;
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                {data?.gender ?? "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/2 lg:w-4/12">
              <IconContext.Provider value={addressIcons}>
                <FaEnvelope />
              </IconContext.Provider>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl ">
                {parseInt(data?.is_email_anonymous, 10) === 1
                  ? "????"
                  : data?.email ?? "N/A"}
              </p>
            </div>
            <div className="flex items-center w-full md:w-1/2 lg:w-4/12">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Qualification: &nbsp;
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                {data?.qualification ?? "N/A"}
              </p>
            </div>
            <div className="flex items-center w-full md:w-1/2 lg:w-4/12">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Working Hours: &nbsp;
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl ">
                {data?.working_hours ?? "N/A"}
              </p>
            </div>
            <div className="flex items-start gap-2 w-full md:w-1/2 lg:w-4/12">
              <div>
                <IconContext.Provider value={addressIcons}>
                  <MdOutlineWeb />
                </IconContext.Provider>
              </div>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl ">
                {parseInt(data?.is_web_address_anonymous, 10) === 1
                  ? "????"
                  : data?.web_address ?? "N/A"}
              </p>
            </div>
            <div className="flex items-center w-full md:w-1/2 lg:w-4/12">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Job Type: &nbsp;
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl ">
                {startCase(data?.job_type) ?? "N/A"}
              </p>
            </div>
            <div className="flex items-center w-full md:w-1/2 lg:w-4/12">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Salary: &nbsp;
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl ">
                {parseInt(data?.is_salary_anonymous, 10) === 1
                  ? "????"
                  : data?.salary ?? "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/2 lg:w-4/12">
              <IconContext.Provider value={addressIcons}>
                <BsLinkedin />
              </IconContext.Provider>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl ">
                @gfsfounderdubai
              </p>
            </div>
            <div className="flex items-center w-full md:w-1/2 lg:w-4/12">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Language: &nbsp;
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                {data?.language ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pp-container my-8 lg:my-20 job-content"
        id="job-description"
      >
        {ReactHtmlParser(data?.content)}
      </section>

      <section className="bg-[#F7F4FB] mt-8" id="additional-information">
        <div className="pp-container py-12">
          <h2 className="font-bold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-12 md:items-start">
            <div>
              <div className="flex items-center mb-3">
                <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Visa: &nbsp;
                </h5>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                  {data?.visa ?? "N/A"}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Gratuity: &nbsp;
                </h5>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                  {data?.gratuity ?? "N/A"}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Housing: &nbsp;
                </h5>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                  {data?.housing ?? "N/A"}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Medical Insurance: &nbsp;
                </h5>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                  {data?.medical_insurance ?? "N/A"}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Flight: &nbsp;
                </h5>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                  {data?.flight ?? "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <h5 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Catering for accessibility needs:
              </h5>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl capitalize">
                &nbsp; {data?.catering_accessibility_needs ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JobsTemplate;
