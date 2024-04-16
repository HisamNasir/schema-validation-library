import { useState } from "react";
import { customValidator, customValidatorSync } from "../utils/schema";
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate using Yup
    const yupErrors = await customValidator(formData);
    //  validate using validator.js
    const validatorErrors = customValidatorSync(formData);
    if (
      Object.keys(yupErrors).length === 0 &&
      Object.keys(validatorErrors).length === 0
    ) {
      alert("Form submitted successfully!");
      setErrors({});
    } else {
      setErrors({ ...yupErrors, ...validatorErrors });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100  px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col gap-8">
        <div>
          <h2 className="text-center text-xl font-bold leading-8 tracking-widest text-gray-900">
            Validation with Yup and Validator.js and Lodash
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-white bg-black" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p
                  className="mt-2 text-sm text-white bg-black"
                  id="email-error"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="age" className="sr-only">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                autoComplete="age"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && (
                <p className="mt-2 text-sm text-white bg-black" id="age-error">
                  {errors.age}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
