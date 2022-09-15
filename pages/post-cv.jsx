import { useState } from "react";
import Head from "next/head";
import Joi from "joi";
import TextareaInput from "../components/base/TextareaInput";
import TextInput from "../components/base/TextInput";
import SelectInput from "../components/base/SelectInput";
import EducationHistoryCV from "../components/base/EducationHistoryCV";
import EmploymentHistoryCV from "../components/base/EmploymentHistoryCV";

let temp = {
  id: 0,
  school_name: "",
  degree_name: "",
  location: "",
  others: "",
  start_month: "",
  end_month: "",
  enrolled: false,
};
export default function PostCV() {
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({});
  const [educationData, setEducationData] = useState([temp]);
  const [errors, setErrors] = useState("");
  const [activeForm, setActiveForm] = useState(educationData.length - 1);
  function handleImage(e) {
    const image = URL.createObjectURL(e.target.files[0]);
    setImagePreview(image);
  }

  const handleInput = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleEducationInput = (e, id) => {
    const a = [...educationData];
    const { name, value } = e.target;
    if (name === "enrolled") {
      if (e.target.checked) {
        a[id] = { ...a[id], [name]: true };
      } else {
        a[id] = { ...a[id], [name]: false };
      }
    } else a[id] = { ...a[id], [name]: value };
    setEducationData(a);
  };

  const handleDelete = (id) => {
    if (educationData.length > 1) {
      setEducationData((prev) => prev.filter((x, i) => i !== id));
    }
    setActiveForm(educationData.length - 1);
  };
  console.log(activeForm);
  const validateEducation = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      school_name: Joi.string().max(120).required(),
      location: Joi.string().required(),
      degree_name: Joi.string().max(120).required(),
      start_month: Joi.date().required(),
      enrolled: Joi.boolean(),
      others: Joi.string().allow(null, ""),
      end_month: Joi.date().allow("", null),
    });

    return schema.validate(data, { abortEarly: false });
  };

  const handleAddMore = () => {
    const res = validateEducation(educationData[educationData.length - 1]);
    if (res.error) {
      const a = res?.error?.details?.map((item) => ({
        name: item.context.key,
        message: item.message,
      }));
      let r = {};
      a.forEach((item) => {
        r = { ...r, [item.name]: item.message };
      });
      setErrors(r);
    } else {
      temp = { ...temp, id: temp.id + 1 };
      setEducationData((p) => [...p, temp]);
      setActiveForm(educationData.length);
      setErrors({});
    }
  };

  const openForm = (id) => {
    setActiveForm(id);
  };

  return (
    <>
      <Head>
        <title>Post CV</title>
      </Head>
      <div className="bg-[#F9F9F9] -mb-12 md:mb-[-80px] lg:mb-[-143px]">
        <section className="internal-header-bg h-auto pb-8 md:h-[354px] pt-[120px] md:pt-[94px] mt-[-65px] lg:mt-[-94px]">
          <div className="flex items-center h-full pp-container">
            <h1 className="text-3xl md:text-5xl 2xl:text-[56px] text-white font-bold">
              Post Your CV
            </h1>
          </div>
        </section>
        <form>
          <section className="mt-16">
            <div className="pp-form-container">
              <h2 className="text-[#737373] font-bold text-xl md:text-2xl lg:text-[28px] xl:text-[34px]">
                1. Personal Information
              </h2>
              <div className="mt-6 md:mt-14">
                <div className="grid grid-cols-1 md:grid-cols-[270px_1fr] gap-6 md:gap-14">
                  <div className="relative">
                    <label htmlFor="dp" className="cursor-pointer">
                      <img
                        src={imagePreview || "/images/image-placeholder.png"}
                        alt=""
                        className="max-w-[100%] w-auto h-auto max-h-[250px] m-auto"
                      />
                      <input
                        type="file"
                        name="dp"
                        id="dp"
                        className="hidden"
                        onChange={handleImage}
                        onClick={(e) => {
                          e.target.value = null;
                          setImagePreview(null);
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      className="bg-white shadow-lg absolute w-8 h-8 flex items-center justify-center rounded-full -top-4  -right-4"
                      onClick={() => setImagePreview(null)}
                    >
                      X
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-y-3 lg:gap-y-6 gap-x-8">
                    <TextInput
                      label="First Name"
                      className="w-full lg:w-[calc(50%_-_16px)]"
                      name="fname"
                      type="text"
                      border
                      placeholder="Enter your first name..."
                      onChange={handleInput}
                    />

                    <TextInput
                      label="Last Name"
                      border
                      className="w-full lg:w-[calc(50%_-_16px)]"
                      name="lname"
                      type="text"
                      placeholder="Enter your last name..."
                      onChange={handleInput}
                    />
                    <TextInput
                      label="Email"
                      className="w-full"
                      name="email"
                      type="email"
                      border
                      placeholder="Enter your email name..."
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-y-6 gap-x-8 mt-6">
                  <TextInput
                    label="Title/Headline"
                    className="w-full"
                    name="headline"
                    border
                    type="text"
                    placeholder="Enter your title/headline name..."
                    onChange={handleInput}
                  />
                  <TextInput
                    label="Contact Number"
                    type="tel"
                    pattern="[0-9]"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="number"
                    placeholder="Enter your phone..."
                    onChange={handleInput}
                  />
                  <TextInput
                    label="Address"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="address"
                    type="text"
                    placeholder="Enter your address..."
                    onChange={handleInput}
                  />
                  <TextInput
                    label="City"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="city"
                    type="text"
                    placeholder="Enter your city..."
                    onChange={handleInput}
                  />
                  <TextInput
                    label="Country"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="country"
                    type="text"
                    placeholder="Enter your country..."
                    onChange={handleInput}
                  />
                  <TextareaInput
                    label="About yourself"
                    border
                    className="w-full"
                    name="about_yourself"
                    placeholder="Tell us about yourself..."
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>

            <div className="pp-form-container mt-8">
              <h2 className="text-[#737373] font-bold text-xl md:text-2xl lg:text-[28px] xl:text-[34px]">
                2. Education History
              </h2>
              {educationData?.map((a, i) => (
                <EducationHistoryCV
                  handleInput={(e) => handleEducationInput(e, i)}
                  item={a}
                  isExtended={i === activeForm}
                  index={i}
                  handleDelete={() => handleDelete(i)}
                  key={a.id}
                  errors={errors}
                  openForm={() => openForm(i)}
                />
              ))}
              <button
                type="button"
                onClick={handleAddMore}
                className="bg-[#F1ECF7] w-full text-center py-5 rounded-lg border-dashed mt-4 border-2"
              >
                Add More Schools
              </button>
            </div>

            <div className="pp-form-container mt-8">
              <h2 className="text-[#737373] font-bold text-xl md:text-2xl lg:text-[28px] xl:text-[34px]">
                3. Employment History
              </h2>
              <EmploymentHistoryCV handleInput={handleInput} />
              <button
                type="button"
                onClick={handleAddMore}
                className="bg-[#F1ECF7] w-full text-center py-5 rounded-lg border-dashed mt-4 border-2"
              >
                Add More Jobs
              </button>
            </div>

            <div className="pp-form-container mt-8">
              <h2 className="text-[#737373] font-bold text-xl md:text-2xl lg:text-[28px] xl:text-[34px]">
                4. Others
              </h2>
              <div className="bg-[#F5F4F4] rounded-xl px-4 lg:px-16 py-12 mt-8">
                <div className="flex flex-wrap gap-y-3 lg:gap-y-6 gap-x-8">
                  <SelectInput
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    label="Skills"
                    name="skills"
                    id="skills"
                    onChange={handleInput}
                  >
                    <option>Select</option>
                    <option value="1">Ajman</option>
                    <option value="2">Dubai</option>
                    <option value="3">Abu Dhabi</option>
                  </SelectInput>

                  <SelectInput
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    label="Accessibility Needs"
                    name="accessibility"
                    id="accessibility"
                    onChange={handleInput}
                  >
                    <option>Select</option>
                    <option value="1">Ajman</option>
                    <option value="2">Dubai</option>
                    <option value="3">Abu Dhabi</option>
                  </SelectInput>
                  <SelectInput
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    label="Salary Range"
                    name="salary"
                    id="salary"
                    onChange={handleInput}
                  >
                    <option>Select</option>
                    <option value="1">0-999</option>
                    <option value="2">1000-4999</option>
                    <option value="3">5000-9999</option>
                  </SelectInput>
                </div>
              </div>
            </div>
            <div className="max-w-[1350px] mx-auto py-10 text-end">
              <button
                type="button"
                className="bg-[#B9B9B9] px-8 py-4 text-white rounded-md"
              >
                Preview
              </button>
              <button
                type="submit"
                className="bg-[#2CB579] ml-3 text-white px-8 py-4 rounded-md"
              >
                Submit
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
