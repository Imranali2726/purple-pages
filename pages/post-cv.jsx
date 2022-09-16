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
let tempEmp = {
  id: 0,
  job_title: "",
  company_name: "",
  sector: "",
  job_country: "",
  start_month: "",
  end_month: "",
  enrolled: false,
};
export default function PostCV() {
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({});
  const [educationData, setEducationData] = useState([temp]);
  const [employmentData, setEmploymentData] = useState([tempEmp]);
  const [errors, setErrors] = useState("");
  const [empErrors, setEmpErrors] = useState("");
  const [activeForm, setActiveForm] = useState(educationData.length - 1);
  const [empForm, setEmpForm] = useState(employmentData.length - 1);
  function handleImage(e) {
    const image = URL.createObjectURL(e.target.files[0]);
    setImagePreview(image);
  }

  const handleInput = (e) => {
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
  const handleEmploymentInput = (e, id) => {
    const a = [...employmentData];
    const { name, value } = e.target;
    if (name === "employed") {
      if (e.target.checked) {
        a[id] = { ...a[id], [name]: true };
      } else {
        a[id] = { ...a[id], [name]: false };
      }
    } else a[id] = { ...a[id], [name]: value };
    setEmploymentData(a);
  };

  const handleDelete = (id) => {
    if (educationData.length > 1) {
      setEducationData((prev) => prev.filter((x, i) => i !== id));
    }
    if (!activeForm < 1) setActiveForm(activeForm - 1);
  };
  const handleEmpDelete = (id) => {
    if (employmentData.length > 1) {
      setEmploymentData((prev) => prev.filter((x, i) => i !== id));
    }
    if (!empForm < 1) setEmpForm(empForm - 1);
  };
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

  const validateEmployment = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      job_title: Joi.string().max(120).required(),
      company_name: Joi.string().required(),
      sector: Joi.string().required(),
      job_country: Joi.string().required(),
      start_month: Joi.date().required(),
      end_month: Joi.date().allow("", null),
      enrolled: Joi.boolean(),
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

  const handleAddEmployment = () => {
    const res = validateEmployment(employmentData[employmentData.length - 1]);
    if (res.error) {
      const a = res?.error?.details?.map((item) => ({
        name: item.context.key,
        message: item.message,
      }));
      let r = {};
      a.forEach((item) => {
        r = { ...r, [item.name]: item.message };
      });
      setEmpErrors(r);
    } else {
      tempEmp = { ...tempEmp, id: tempEmp.id + 1 };
      setEmploymentData((p) => [...p, tempEmp]);
      setEmpForm(employmentData.length);
      setEmpErrors({});
    }
  };

  const openForm = (id) => {
    setActiveForm(id);
  };
  const empOpenForm = (id) => {
    setEmpForm(id);
  };

  return (
    <>
      <Head>
        <title>Post CV</title>
        <style>
          {`
            body{
              background-color:#f9f9f9;
            }`}
        </style>
      </Head>
      <div className="-mb-12 md:mb-[-80px] lg:mb-[-143px]">
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
                      value={formData?.fname}
                      // error={formData?.fname}
                      border
                      placeholder="Enter your first name..."
                      onChange={handleInput}
                    />

                    <TextInput
                      label="Last Name"
                      border
                      className="w-full lg:w-[calc(50%_-_16px)]"
                      name="lname"
                      value={formData?.lname}
                      // error={formData?.lname}
                      type="text"
                      placeholder="Enter your last name..."
                      onChange={handleInput}
                    />
                    <TextInput
                      label="Email"
                      className="w-full"
                      name="email"
                      type="email"
                      value={formData?.email}
                      // error={formData?.email}
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
                    value={formData?.headline}
                    // error={formData?.headline}
                    placeholder="Enter your title/headline name..."
                    onChange={handleInput}
                  />
                  <TextInput
                    label="Contact Number"
                    type="tel"
                    pattern="[0-9]"
                    border
                    value={formData?.number}
                    // error={formData?.number}
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
                    value={formData?.address}
                    // error={formData?.address}
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
                    value={formData?.city}
                    // error={formData?.city}
                    placeholder="Enter your city..."
                    onChange={handleInput}
                  />
                  <TextInput
                    label="Country"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="country"
                    value={formData?.country}
                    // error={formData?.country}
                    type="text"
                    placeholder="Enter your country..."
                    onChange={handleInput}
                  />
                  <TextareaInput
                    label="About yourself"
                    border
                    className="w-full"
                    value={formData?.about_yourself}
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
              {employmentData?.map((a, i) => (
                <EmploymentHistoryCV
                  handleInput={(e) => handleEmploymentInput(e, i)}
                  errors={empErrors}
                  item={a}
                  isExtended={i === empForm}
                  index={i}
                  key={a.id}
                  handleDelete={() => handleEmpDelete(i)}
                  openForm={() => empOpenForm(i)}
                />
              ))}
              <button
                type="button"
                onClick={handleAddEmployment}
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
