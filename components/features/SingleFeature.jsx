export default function SingleFeature({ data }) {
  return (
    <li className="flex items-start gap-3">
      <img
        src={
          data.status ? "/images/feature-green.svg" : "/images/feature-gray.svg"
        }
        alt=""
      />
      <p className="text-[#737373] text-sm lg:text-base xl:text-lg -mt-1">
        {data.label}
      </p>
    </li>
  );
}