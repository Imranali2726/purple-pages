import Rate from "rc-rate";

export default function ReviewSlide() {
  return (
    <div className="px-6 py-4 lg:py-8 lg:px-11 bg-[#F1ECF7] shadow-[0_3px_6px_#00000029] rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg lg:text-xl xl:text-2xl">John Doe</p>
        <Rate value={5} disabled />
      </div>
      <p className="mt-4 lg:mt-8 text-sm md:text-base lg:text-lg">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s.
      </p>
    </div>
  );
}
