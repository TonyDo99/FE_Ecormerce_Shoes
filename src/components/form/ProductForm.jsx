import { useState } from "react";
import { Spin } from "react-cssfx-loading/lib";

export function FormProduct({
  formik,
  loading,
  ls_status,
  selected,
  select,
  setSelect,
}) {
  let [now, setNow] = useState(new Date());

  setInterval(() => {
    setNow(new Date());
  }, 1000);
  return (
    <div className="flex flex-wrap flex-col md:flex-row pt-8">
      <div className="w-full px-5 lg:px-0 md:w-[30%]">
        <div className="flex flex-col justify-center items-center px-6 py-8 rounded-md shadow-all-rounded">
          <div>
            <video
              className="max-w-full"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
              poster="https://cdnl.iconscout.com/lottie/premium/thumb/upload-data-to-cloud-4894787-4138955.mp4"
            >
              <source
                type="video/mp4"
                src="https://cdnl.iconscout.com/lottie/premium/thumb/upload-data-to-cloud-4894787-4138955.mp4"
              />
            </video>
          </div>
          <span className="font-Inter text-sm text-[#65748b] py-1">
            PNG, JPG, GIF up to 10MB
          </span>
          <span className="font-Inter text-sm text-[#65748b]">{`${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()} ${now.getHours()}h:${now.getMinutes()}m:${now.getSeconds()}s`}</span>
        </div>
        <div className="pt-3">
          <label htmlFor="path">
            <div className="px-1 py-3 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
              <div className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                Upload picture
                <input
                  id="path"
                  name="path"
                  type="file"
                  className="sr-only"
                  onChange={(event) => {
                    formik.setFieldValue("path", event.currentTarget.files[0]);
                  }}
                />
                {formik.touched.path && formik.errors.path ? (
                  <p className="animate-pulse text-[#f2566e] text-sm md:text-base font-normal">
                    {formik.errors.path}
                  </p>
                ) : null}
              </div>
            </div>
          </label>
        </div>
      </div>
      {/* Right */}
      <div className="pt-16 w-full md:w-[70%] md:pt-0 md:pl-6">
        <div className="sm:px-6 sm:pb-8">
          <h3 className="ml-5 md:ml-0 text-lg font-medium leading-6 text-gray-900">
            Product information
          </h3>
          <p className="mt-1 ml-5 md:ml-0 text-sm text-[#65748b]">
            This information of product will be saved to the database.
          </p>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    id="listbox-label"
                    className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                  >
                    Status
                  </label>
                  <div className="mt-1 relative">
                    <button
                      type="button"
                      className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      aria-haspopup="listbox"
                      aria-expanded="true"
                      aria-labelledby="listbox-label"
                      onClick={() => setSelect(!select)}
                    >
                      <span className="flex items-center">
                        <img
                          src={formik.values.src}
                          alt=""
                          className="flex-shrink-0 h-6 w-6 rounded-full"
                        />
                        <span
                          className={`${
                            formik.values.status.toUpperCase() === "POPULAR"
                              ? "text-pink_f5548e"
                              : formik.values.status.toUpperCase() === "NEW"
                              ? "text-blue-500"
                              : "text-yellow-500"
                          } + " font-semibold ml-3 block truncate"`}
                        >
                          {formik.values.status}
                        </span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>

                    <ul
                      className={`${
                        select
                          ? "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                          : "hidden"
                      } `}
                      tabIndex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-option-3"
                    >
                      {ls_status &&
                        ls_status.map((item, index) => (
                          <li
                            key={index}
                            className="text-gray-900 select-auto relative py-2 pl-3 pr-9 cursor-pointer"
                            id="listbox-option-0"
                            aria-selected="true"
                            role="option"
                            onClick={() => selected(formik, item)}
                          >
                            <div className="flex items-center">
                              <img
                                src={item.path}
                                alt=""
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />

                              <span
                                className={`${
                                  (item.status.toString().toUpperCase() ===
                                  "POPULAR"
                                    ? "text-pink_f5548e"
                                    : item.status.toString().toUpperCase() ===
                                      "NEW"
                                    ? "text-blue-500"
                                    : "text-yellow-500") +
                                  " font-semibold ml-3 block truncate"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>

                            <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    autoComplete="quantity"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                      {formik.errors.quantity}
                    </p>
                  ) : null}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="price"
                    className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                      {formik.errors.price}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className=" py-5 text-right">
                {loading ? (
                  <button className="inline-flex items-center justify-center py-1 px-4 sm:py-3 sm:px-3 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                    <Spin color="#5048e5" width="20px" height="20px" />
                    <span className="text-center font-Inter font-semibold text-[#5048e5] ml-3">
                      Processing...
                    </span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
