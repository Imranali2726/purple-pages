import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

function EmploymentHistoryCV({ handleInput }) {
  return (
    <div className="bg-[#F5F4F4] rounded-xl px-4 lg:px-16 py-12 mt-8">
      <div className="flex flex-wrap gap-y-3 lg:gap-y-6 gap-x-8">
        <TextInput
          label="Job Title"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="job_title"
          type="text"
          onChange={handleInput}
        />
        <SelectInput
          className="w-full lg:w-[calc(50%_-_16px)]"
          label="Company Name"
          name="company_name"
          id="company_name"
          onChange={handleInput}
        >
          <option>Select</option>
          <option value="1">Ajman</option>
          <option value="2">Dubai</option>
          <option value="3">Abu Dhabi</option>
        </SelectInput>
        <TextInput
          label="Sector"
          className="w-full lg:w-[calc(50%_-_16px)]"
          name="sector"
          type="text"
          onChange={handleInput}
        />
        <SelectInput
          className="w-full lg:w-[calc(50%_-_16px)]"
          label="Country"
          name="job_country"
          id="job_country"
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
              name="job_start_month"
              id="job_start_month"
              className="form-input "
              onChange={handleInput}
            />
          </label>
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
                  htmlFor="present"
                  className="text-xs font-normal flex items-center"
                >
                  Currently Employed
                  <input
                    type="checkbox"
                    name="present"
                    id="present"
                    className="ml-1"
                  />
                </label>
              </div>
            </div>
            <input
              type="month"
              name="job_end_month"
              id="job_end_month"
              className="form-input "
              onChange={handleInput}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default EmploymentHistoryCV;
