import { useState, useEffect } from "react";
import Head from "next/head";
import Joi from "joi";
import { useSession } from "next-auth/react";
import axios from "axios";
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth";
import slugify from "slugify";
import { authOptions } from "./api/auth/[...nextauth]";
import ReactSelect from "../components/base/ReactSelect";
import TextareaInput from "../components/base/TextareaInput";
import TextInput from "../components/base/TextInput";
import EducationHistoryCV from "../components/base/EducationHistoryCV";
import EmploymentHistoryCV from "../components/base/EmploymentHistoryCV";
import {
  getSkills,
  getAccessibilityFeature,
  getSectors,
  getLocation,
} from "../services/apiCalls";
import AuthenticationPopup from "../components/include/AuthenticationPopup";
import SignInPopup from "../components/include/SignInPopup";

// temp is education
let temp = {
  id: 0,
  name: "",
  degree: "",
  location: "",
  others: "",
  start_date: "",
  end_date: "",
  grade: "",
  is_current: 0,
};

// This is for the employment
let tempEmp = {
  id: 0,
  name: "",
  company_name: "",
  sector: "",
  country: "",
  start_date: "",
  end_date: "",
  is_current: 0,
};

const jobTypeValues = [
  { label: "Full Time", value: "full_time" },
  { label: "Part Time", value: "part_time" },
  { label: "Contract", value: "contract" },
];
export default function PostCV() {
  const [selectedImage, setSelectedImage] = useState("");
  const [formData, setFormData] = useState({});
  const [educationData, setEducationData] = useState([temp]);
  const [employmentData, setEmploymentData] = useState([tempEmp]);
  const [dataErrors, setDataErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [empErrors, setEmpErrors] = useState({});
  const [activeForm, setActiveForm] = useState(educationData.length - 1);
  const [empForm, setEmpForm] = useState(employmentData.length - 1);
  const [popupActive, setPopupActive] = useState(false);
  const [signInPopupActive, setSignInPopupActive] = useState(false);
  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [successMessage, setSuccessMesssage] = useState("");
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSectors] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [jobType, setJobType] = useState([]);
  const session = useSession();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleEducationInput = (e, id) => {
    const a = [...educationData];
    const { name, value } = e.target;
    if (name === "is_current") {
      if (e.target.checked) {
        a[id] = { ...a[id], [name]: 1, end_date: "" };
      } else {
        a[id] = { ...a[id], [name]: 0 };
      }
    } else a[id] = { ...a[id], [name]: value };
    setEducationData(a);
  };
  const handleEmploymentInput = (e, id) => {
    const a = [...employmentData];
    const { name, value } = e.target;
    if (name === "is_current") {
      if (e.target.checked) {
        a[id] = { ...a[id], [name]: 1, end_date: "" };
      } else {
        a[id] = { ...a[id], [name]: 0 };
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

  const validateCVData = (data) => {
    const schema = Joi.object({
      is_first_name_anonymous: Joi.number().allow(null),
      is_last_name_anonymous: Joi.number().allow(null),
      is_email_anonymous: Joi.number().allow(null),
      is_image_anonymous: Joi.number().allow(null),
      is_address_anonymous: Joi.number().allow(null),
      is_phone_anonymous: Joi.number().allow(null),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.number().required(),
      title: Joi.string().allow(null, ""),
      address: Joi.string().required(),
      state: Joi.string().allow(null, ""),
      country: Joi.string().allow(null, ""),
      about_yourself: Joi.string().allow(null, ""),
    });

    return schema.validate(data, { abortEarly: false });
  };
  const validateEducation = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().max(120).required(),
      location: Joi.string().required(),
      degree: Joi.string().max(120).required(),
      start_date: Joi.date().required(),
      is_current: Joi.number(),
      others: Joi.string().allow(null, ""),
      grade: Joi.string().allow(null, ""),
      end_date: Joi.date().allow("", null),
    });

    return schema.validate(data, { abortEarly: false });
  };

  const validateEmployment = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().max(120).required(),
      company_name: Joi.string().required(),
      sector: Joi.string().required(),
      country: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().allow("", null),
      is_current: Joi.number(),
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

  function anonyFunc(e) {
    const { checked, name } = e.target;
    if (checked) setFormData((p) => ({ ...p, [name]: 1 }));
    else setFormData((p) => ({ ...p, [name]: 0 }));
  }

  async function handleCVSubmit(e) {
    e.preventDefault();
    setErrors("");
    setDataErrors("");
    setEmpErrors("");
    setSuccessMesssage("");
    const cv = validateCVData(formData);
    const empd = validateEmployment(employmentData[employmentData.length - 1]);
    const edud = validateEducation(educationData[educationData.length - 1]);

    if (cv.error || empd.error || edud.error) {
      if (empd.error) {
        const a = empd?.error?.details?.map((item) => ({
          name: item.context.key,
          message: item.message,
        }));
        let r = {};
        a.forEach((item) => {
          r = { ...r, [item.name]: item.message };
        });
        setEmpErrors(r);
      }
      if (edud.error) {
        const a = edud?.error?.details?.map((item) => ({
          name: item.context.key,
          message: item.message,
        }));
        let r = {};
        a.forEach((item) => {
          r = { ...r, [item.name]: item.message };
        });
        setErrors(r);
      }
      if (cv.error) {
        const a = cv?.error?.details?.map((item) => ({
          name: item.context.key,
          message: item.message,
        }));
        let r = {};
        a.forEach((item) => {
          r = { ...r, [item.name]: item.message };
        });
        setDataErrors(r);
      }

      return;
    }

    axios
      .get(
        "http://localhost:8000/sanctum/csrf-cookie",
        { Accept: "*/*" },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        axios({
          method: "PUT",
          url: `${process.env.BASE_URL_LOCAL}user/cv/update/${session?.data?.user.user_id}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data.user.token.user_token}`,
          },
          data: {
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            is_address_anonymous: formData?.is_address_anonymous,
            is_email_anonymous: formData?.is_email_anonymous,
            is_first_name_anonymous: formData?.is_first_name_anonymous,
            is_last_name_anonymous: formData?.is_last_name_anonymous,
            is_phone_anonymous: formData?.is_phone_anonymous,
            is_photo_anonymous: formData?.is_photo_anonymous,
            phone: formData?.phone,
            address: formData?.address,
            title: formData?.title,
            about_yourself: formData?.about_yourself,
            job_type: selectedJobType,
            sectors: selectedSector,
            education_history: JSON.stringify(educationData),
            user_experience: JSON.stringify(employmentData),
            gender: "male",
            dob: "2022-09-22",
            user_type: "user",
            user_skills: JSON.stringify(selectedSkills),
            accessibilityFeatures: JSON.stringify(selectedFeatures),
            state_id: selectedStates.id,
          },
          withCredentials: true,
        }).then((res) => {
          if (res.status === 200)
            setSuccessMesssage("Your CV has been successfully updated.");

          setTimeout(() => {
            setSuccessMesssage("");
          }, 5000);
        });
      });
  }

  async function getSkillsCall() {
    try {
      if (skills?.length <= 0) {
        const res = await getSkills("skills");
        setSkills(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getAccessibilityFeatures() {
    try {
      if (skills?.length <= 0) {
        const res = await getAccessibilityFeature("accessibility-features");
        setAccessibilityFeatures(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getSector() {
    try {
      if (skills?.length <= 0) {
        const res = await getSectors("sectors");
        setSectors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getStates() {
    try {
      if (states?.length <= 0) {
        const res = await getLocation();
        setStates(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setJobType(jobTypeValues);
    getSkillsCall();
    getAccessibilityFeatures();
    getSector();
    getStates();
  }, []);

  const handleAccessibilityChange = (e, name) => {
    setSelectedFeatures((p) => ({
      ...p,
      [slugify(name.toLowerCase(), "_")]: e,
    }));
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
      {popupActive && <AuthenticationPopup setPopupActive={setPopupActive} />}
      {signInPopupActive && (
        <SignInPopup
          setSignInPopupActive={setSignInPopupActive}
          setPopupActive={setPopupActive}
        />
      )}
      <div className="-mb-12 md:mb-[-80px] lg:mb-[-143px]">
        <section className="internal-header-bg h-auto pb-8 md:h-[354px] pt-[120px] md:pt-[94px] mt-[-65px] lg:mt-[-94px]">
          <div className="flex items-center h-full pp-container">
            <h1 className="text-3xl md:text-5xl 2xl:text-[56px] text-white font-bold">
              Post Your CV
            </h1>
          </div>
        </section>
        <form onSubmit={handleCVSubmit}>
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
                        src={
                          (selectedImage &&
                            URL.createObjectURL(selectedImage)) ||
                          "/images/image-placeholder.png"
                        }
                        alt=""
                        className="max-w-[100%] w-auto h-auto max-h-[250px] m-auto"
                      />
                      <input
                        type="file"
                        name="image"
                        multiple={false}
                        id="dp"
                        className="hidden"
                        onChange={(e) => {
                          setSelectedImage(e.target.files[0]);
                        }}
                        onClick={(e) => {
                          e.target.value = null;
                          setSelectedImage(null);
                        }}
                      />
                    </label>
                    <label
                      htmlFor="is_photo_anonymous"
                      className="text-xs flex items-center mt-1 font-semibold text-[#737373]"
                    >
                      Make image anonymous
                      <input
                        type="checkbox"
                        name="is_photo_anonymous"
                        id="is_photo_anonymous"
                        className="ml-2"
                        onChange={(e) => anonyFunc(e)}
                      />
                    </label>
                    {selectedImage && (
                      <button
                        type="button"
                        className="bg-white shadow-lg absolute w-8 h-8 flex items-center justify-center rounded-full -top-4  -right-4"
                        onClick={() => setSelectedImage(null)}
                      >
                        X
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-y-3 lg:gap-y-6 gap-x-8">
                    <TextInput
                      label="First Name"
                      className="w-full lg:w-[calc(50%_-_16px)]"
                      name="first_name"
                      type="text"
                      value={formData?.first_name}
                      error={dataErrors?.first_name}
                      anonymous
                      anonyFunc={(e) => anonyFunc(e)}
                      border
                      placeholder="Enter your first name..."
                      onChange={handleInput}
                    />

                    <TextInput
                      label="Last Name"
                      border
                      className="w-full lg:w-[calc(50%_-_16px)]"
                      name="last_name"
                      value={formData?.last_name}
                      error={dataErrors?.last_name}
                      type="text"
                      placeholder="Enter your last name..."
                      onChange={handleInput}
                      anonymous
                      anonyFunc={(e) => anonyFunc(e)}
                    />
                    <TextInput
                      label="Email"
                      className="w-full"
                      name="email"
                      type="email"
                      value={formData?.email}
                      error={dataErrors?.email}
                      border
                      placeholder="Enter your email name..."
                      onChange={handleInput}
                      anonymous
                      anonyFunc={(e) => anonyFunc(e)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-y-6 gap-x-8 mt-6">
                  <TextInput
                    label="Job Title"
                    className="w-full"
                    name="title"
                    border
                    type="text"
                    value={formData?.title}
                    error={dataErrors?.title}
                    placeholder="Enter your job title name..."
                    onChange={handleInput}
                  />
                  <TextInput
                    label="Contact Number"
                    type="tel"
                    pattern="[0-9]"
                    border
                    value={formData?.phone}
                    error={dataErrors?.phone}
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="phone"
                    placeholder="Enter your phone..."
                    onChange={handleInput}
                    anonymous
                    anonyFunc={(e) => anonyFunc(e)}
                  />
                  <TextInput
                    label="Address"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="address"
                    value={formData?.address}
                    error={dataErrors?.address}
                    type="text"
                    placeholder="Enter your address..."
                    onChange={handleInput}
                    anonymous
                    anonyFunc={(e) => anonyFunc(e)}
                  />
                  {/* <TextInput
                    label="State"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="state"
                    type="text"
                    value={formData?.state}
                    error={dataErrors?.state}
                    placeholder="Enter your city..."
                    onChange={handleInput}
                  /> */}
                  <ReactSelect
                    options={states}
                    label="State"
                    classNamePrefix="state-select"
                    className="w-full lg:w-[calc(50%_-_16px)] "
                    onChange={(e) => setSelectedStates(e)}
                  />
                  <TextInput
                    label="Country"
                    border
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="country"
                    value={formData?.country}
                    error={dataErrors?.country}
                    type="text"
                    placeholder="Enter your country..."
                    onChange={handleInput}
                  />
                  <TextareaInput
                    label="About yourself"
                    border
                    className="w-full"
                    value={formData?.about_yourself}
                    error={dataErrors?.about_yourself}
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
                  <ReactSelect
                    options={skills}
                    isMulti
                    label="Skills"
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    onChange={(e) => setSelectedSkills(e)}
                  />

                  <ReactSelect
                    options={skills}
                    label="Salary"
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    onChange={(e) => console.log(e)}
                  />
                  <ReactSelect
                    options={sectors}
                    label="Sector"
                    isMulti
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    onChange={(e) => setSelectedSectors(e)}
                  />
                  <ReactSelect
                    options={jobType}
                    label="Job Type"
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    onChange={(e) => setSelectedJobType(e)}
                  />

                  <div className="flex flex-col w-full">
                    <h3 className="font-bold text-lg md:text-xl xl:text-3xl my-12">
                      Accessibility Features
                    </h3>

                    <div className="flex flex-wrap gap-y-3 lg:gap-y-6 gap-x-8">
                      {accessibilityFeatures?.map(
                        (a) =>
                          a?.sub_accessibility_features && (
                            <ReactSelect
                              options={a?.sub_accessibility_features.map(
                                (a) => ({
                                  label: a?.name,
                                  value: a?.id,
                                }),
                              )}
                              label={a?.name}
                              isMulti
                              className="w-full lg:w-[calc(50%_-_16px)]"
                              onChange={(e) =>
                                handleAccessibilityChange(e, a?.name)
                              }
                              key={a?.id}
                            />
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {successMessage && (
              <div className="max-w-[1350px] mx-auto px-8 my-4">
                <p className="text-xs text-green-500">{successMessage}</p>
              </div>
            )}
            <div className="max-w-[1350px] mx-auto py-10 text-end px-4">
              {/* <button
                  type="button"
                  className="bg-[#B9B9B9] px-8 py-4 text-white rounded-md"
                >
                  Preview
                </button> */}
              {session.status === "authenticated" ? (
                <button
                  type="submit"
                  className="bg-[#2CB579] ml-3 text-white px-8 py-4 rounded-md"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSignInPopupActive(true)}
                  className="bg-[#2CB579] ml-3 text-white px-8 py-4 rounded-md"
                >
                  Submit
                </button>
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
