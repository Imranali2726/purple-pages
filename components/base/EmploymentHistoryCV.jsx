import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { startCase } from "lodash";
import TextInput from "./TextInput";

const editIcon = { className: "w-6 h-6" };
function EmploymentHistoryCV({
  handleInput,
  errors,
  index,
  isExtended,
  item,
  openForm,
  handleDelete,
}) {
  if (!isExtended) {
    return (
      <div className="bg-[#F5F4F4] rounded-xl px-4 lg:px-12 py-8 mt-8 flex items-center justify-between">
        <p className="font-bold text-lg">
          {index + 1}. {item.name}
        </p>
        <div>
          <button type="button" onClick={openForm}>
            <IconContext.Provider value={editIcon}>
              <FiEdit />
            </IconContext.Provider>
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="bg-white p-1 rounded-md ml-4"
          >
            <IconContext.Provider value={editIcon}>
              <MdDelete />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#F5F4F4] rounded-xl px-4 lg:px-16 py-12 mt-8">
      <div className="flex flex-wrap gap-y-3 lg:gap-y-6 gap-x-8">
        <TextInput
          label="Job Title"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="name"
          id="job_name"
          type="text"
          error={errors.name}
          value={item.name}
          onChange={handleInput}
        />
        <TextInput
          className="w-full lg:w-[calc(50%_-_16px)]"
          label="Company Name"
          name="company_name"
          error={errors.company_name}
          value={item.company_name}
          id="company_name"
          onChange={handleInput}
        />
        <TextInput
          label="Sector"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="sector"
          id="sector"
          error={errors.sector}
          value={item.sector}
          type="text"
          onChange={handleInput}
        />
        <TextInput
          label="Description"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="content"
          id="content"
          error={errors.content}
          value={item.content}
          type="text"
          onChange={handleInput}
        />

        <div className="w-full lg:w-[calc(50%_-_16px)] ">
          <label
            htmlFor="job_start_month"
            className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-[#737373] flex flex-col gap-y-3"
          >
            Start Date
            <input
              type="month"
              name="start_date"
              id="job_start_month"
              className="form-input "
              onChange={handleInput}
              value={item.start_date}
            />
          </label>
          {errors && (
            <p className="text-red-600 text-xs mt-2">
              {startCase(errors.start_date)}
            </p>
          )}
        </div>
        <div className="w-full lg:w-[calc(50%_-_16px)] ">
          <label
            htmlFor="job_end_month"
            className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-[#737373] flex flex-col gap-y-3"
          >
            <div className="flex items-center justify-between">
              End Date
              <div>
                <label
                  htmlFor="employed"
                  className="text-xs font-normal flex items-center"
                >
                  Currently Employed
                  <input
                    type="checkbox"
                    name="is_current"
                    id="employed"
                    className="ml-1"
                    onChange={handleInput}
                    checked={Number(item.is_current) === 1}
                  />
                </label>
              </div>
            </div>
            <input
              type="month"
              name="end_date"
              id="job_end_month"
              className="form-input "
              disabled={item.is_current === 1}
              onChange={handleInput}
              value={item?.end_date}
            />
          </label>
          {errors && (
            <p className="text-red-600 text-xs mt-2">
              {startCase(errors.end_date)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmploymentHistoryCV;
