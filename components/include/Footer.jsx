import Link from "next/link";

export default function Footer() {
  const links = [
    {
      name: "Education",
      links: [
        { label: "Project management Courses", link: "#" },
        { label: "Health & Social Care Courses", link: "#" },
        { label: "Apprenticeship Levy", link: "#" },
        { label: "ABA Therapy", link: "#" },
      ],
    },
    {
      name: "Travel & Tour",
      links: [
        { label: "Hotels", link: "#" },
        { label: "Resturants", link: "#" },
        { label: "Trip Listing", link: "#" },
        { label: "Features", link: "#" },
      ],
    },
    {
      name: "Hospitality",
      links: [
        { label: "Cinema", link: "#" },
        { label: "Banks Post Offices", link: "#" },
        { label: "Malls", link: "#" },
        { label: "Delivery Services", link: "#" },
      ],
    },
    {
      name: "Career Support",
      links: [
        { label: "Jobs Offering", link: "#" },
        { label: "Jobs Listing", link: "#" },
        { label: "Post a Job", link: "#" },
      ],
    },
  ];
  return (
    <footer className="bg-[#C999EF] pt-4 pl-3 rounded-tl-[48px] mt-12 md:mt-[80px] lg:mt-[143px]">
      <div className="bg-primary lg:pt-[58px] pt-8   md:pt-[60px] xl:pt-[80px]">
        <div className="pp-container">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[290px_1fr_1fr_1fr] xl:grid-cols-5 2xl:grid-cols-[1fr_280px_1fr_1fr_1fr] gap-5 md:gap-8 lg:gap-12 xl:gap-16">
            <p className="font-bold text-white text-2xl 2xl:text-3xl col-span-1 lg:col-span-4 xl:col-span-1">
              Purple Pages
            </p>
            {links.map((link) => (
              <div key={link.name} className="pp-link-wrapper">
                <p className="text-white font-bold text-xl 2xl:text-2xl">
                  {link.name}
                </p>
                <ul className="mt-2 md:mt-6">
                  {link.links.map((item) => (
                    <li key={item.label}>
                      <Link href={item.link}>
                        <a className="text-white 2xl:text-lg mb-2 inline-block font-medium">
                          {" "}
                          {item.label}{" "}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 md:mt-[64px] lg:mt-[90px] xl:mt-[125px]">
            <p className="text-white text-sm border-t py-3">
              Copyright by{" "}
              <Link href="#">
                <a className="text-white"> Digicoms.net </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
