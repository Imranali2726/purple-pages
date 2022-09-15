import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

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
          {index + 1}. {item.school_name}
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
          name="school_name"
          value={item.school_name}
          type="text"
          error={errors.school_name}
          onChange={handleInput}
        />
        <SelectInput
          className="w-full lg:w-[calc(50%_-_16px)]"
          label="Location"
          name="location"
          value={item.location}
          id="location"
          error={errors.location}
          onChange={handleInput}
        >
          <option>Select</option>
          <option value="1">Ajman</option>
          <option value="2">Dubai</option>
          <option value="3">Abu Dhabi</option>
        </SelectInput>

        <TextInput
          label="Degree"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="degree_name"
          value={item.degree_name}
          type="text"
          error={errors.degree_name}
          onChange={handleInput}
        />
        <SelectInput
          className="w-full lg:w-[calc(50%_-_16px)]"
          label="Others"
          name="others"
          id="others"
          value={item.others}
          error={errors.others}
          onChange={handleInput}
        >
          <option>Select</option>
          <option value="1">Ajman</option>
          <option value="2">Dubai</option>
          <option value="3">Abu Dhabi</option>
        </SelectInput>
        <div className="w-full lg:w-[calc(50%_-_16px)] ">
          <label
            htmlFor="start_month"
            className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[25px] text-[#737373] flex flex-col gap-y-3"
          >
            Start Date
            <input
              type="month"
              name="start_month"
              value={item.start_month}
              id="start_month"
              className="form-input "
              onChange={handleInput}
            />
          </label>
          {errors && (
            <p className="text-red-600 text-xs mt-2">{errors.start_month}</p>
          )}
        </div>
        <div className="w-full lg:w-[calc(50%_-_16px)] ">
          <label
            htmlFor="end_month"
            className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[25px] text-[#737373] flex flex-col gap-y-3"
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
                    name="enrolled"
                    id="enrolled"
                    defaultChecked={item.enrolled}
                    className="ml-1"
                    onChange={handleInput}
                  />
                </label>
              </div>
            </div>
            <input
              type="month"
              name="end_month"
              id="end_month"
              disabled={item.enrolled}
              value={item.end_month}
              className="form-input "
              onChange={handleInput}
            />
          </label>
          {errors && (
            <p className="text-red-600 text-xs mt-2">{errors.end_month}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationHistoryCV;
