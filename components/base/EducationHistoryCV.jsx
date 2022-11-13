import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { startCase } from "lodash";
import { IconContext } from "react-icons";
import TextInput from "./TextInput";

const editIcon = { className: "w-6 h-6" };
function EducationHistoryCV({
  handleInput,
  isExtended = false,
  handleDelete,
  item,
  errors,
  index,
  openForm,
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
          label="School Name"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="name"
          value={item.name}
          type="text"
          error={errors.name}
          onChange={handleInput}
        />
        <TextInput
          className="w-full lg:w-[calc(50%_-_16px)]"
          label="Location"
          name="location"
          value={item.location}
          id="location"
          error={errors.location}
          onChange={handleInput}
        />

        <TextInput
          label="Degree"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="degree"
          value={item.degree}
          type="text"
          error={errors.degree}
          onChange={handleInput}
        />
        <TextInput
          className="w-full lg:w-[calc(50%_-_16px)]"
          label="Others"
          name="others"
          id="others"
          value={item.others}
          error={errors.others}
          onChange={handleInput}
        />
        <div className="w-full lg:w-[calc(50%_-_16px)] ">
          <label
            htmlFor="start_date"
            className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-[#737373] flex flex-col gap-y-3"
          >
            Start Date
            <input
              type="month"
              name="start_date"
              value={item.start_date}
              id="start_date"
              className="form-input "
              onChange={handleInput}
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
            htmlFor="end_date"
            className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-[#737373] flex flex-col gap-y-3"
          >
            <div className="flex items-center justify-between">
              End Date
              <div>
                <label
                  htmlFor="enrolled"
                  className="text-xs font-normal flex items-center"
                >
                  Currently Enrolled
                  <input
                    type="checkbox"
                    name="is_current"
                    id="enrolled"
                    checked={Number(item.is_current) === 1}
                    className="ml-1"
                    onChange={handleInput}
                  />
                </label>
              </div>
            </div>
            <input
              type="month"
              name="end_date"
              id="end_date"
              disabled={item.is_current === 1}
              value={item.end_date}
              className="form-input "
              onChange={handleInput}
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

export default EducationHistoryCV;
