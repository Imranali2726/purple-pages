import { useState } from "react";
import TextareaInput from "../components/base/TextareaInput";
import TextInput from "../components/base/TextInput";

export default function PostCV() {
  const [imagePreview, setImagePreview] = useState("");
  function handleImage(e) {
    const image = URL.createObjectURL(e.target.files[0]);
    setImagePreview(image);
  }
  return (
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
                <div>
                  <label htmlFor="dp" className="cursor-pointer">
                    <img
                      src={imagePreview || "/images/image-placeholder.png"}
                      alt=""
                      className="max-w-[100%] w-auto h-auto max-h-[250px]"
                    />
                    <input
                      type="file"
                      name="dp"
                      id="dp"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-y-3 lg:gap-y-6 gap-x-8">
                  <TextInput
                    label="First Name"
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="fname"
                    type="text"
                    placeholder="Enter your first name..."
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />

                  <TextInput
                    label="Last Name"
                    className="w-full lg:w-[calc(50%_-_16px)]"
                    name="lname"
                    type="text"
                    placeholder="Enter your last name..."
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                  <TextInput
                    label="Email"
                    className="w-full"
                    name="email"
                    type="email"
                    placeholder="Enter your email name..."
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-y-6 gap-x-8 mt-6">
                <TextInput
                  label="Title/Headline"
                  className="w-full"
                  name="headline"
                  type="text"
                  placeholder="Enter your title/headline name..."
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <TextInput
                  label="Contact Number"
                  className="w-full lg:w-[calc(50%_-_16px)]"
                  name="number"
                  type="number"
                  placeholder="Enter your phone..."
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <TextInput
                  label="Address"
                  className="w-full lg:w-[calc(50%_-_16px)]"
                  name="address"
                  type="text"
                  placeholder="Enter your address..."
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <TextInput
                  label="City"
                  className="w-full lg:w-[calc(50%_-_16px)]"
                  name="city"
                  type="text"
                  placeholder="Enter your city..."
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <TextInput
                  label="Country"
                  className="w-full lg:w-[calc(50%_-_16px)]"
                  name="country"
                  type="text"
                  placeholder="Enter your country..."
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <TextareaInput
                  label="About yourself"
                  className="w-full"
                  name="country"
                  placeholder="Tell us about yourself..."
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
