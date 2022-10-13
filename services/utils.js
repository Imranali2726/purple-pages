export const getDate = (date, format) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date(date);
  const day = d.getDate();
  const monthNumber = d.getMonth();
  const year = d.getFullYear();
  const m = month[monthNumber];
  if (format === "mmm dd,yyyy") return `${m} ${day}, ${year}`;
  return `${year}-${m}-${day}`;
};

export const slugify = (string) => {
  const slugifiedText = string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return slugifiedText;
};

export const selectStyles = {
  option: () => ({
    padding: 8,
  }),
  control: () => ({
    padding: "14px 8px",
    background: "white",
    display: "flex",
    borderRadius: "16px",
  }),
};
