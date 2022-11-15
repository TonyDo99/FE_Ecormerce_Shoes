import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { About, Footer } from "./Home";
import { NavPage } from "../../components/Context/NavPage";
import { HeaderCategories } from "./Categories";
import { fetchCart, sendFeedBack } from "../../api/clientAPI";

import { FcManager, FcIphone, FcGoogle } from "react-icons/fc";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import { BsInstagram } from "react-icons/bs";

import Avatar from "../../img/avatar.jpg";

const axios = require("axios").default;

const Review = (id) => {
  return (
    <div
      key={id}
      data-aos="fade-up-right"
      data-aos-offset="500"
      data-aos-easing="ease-in-sine"
      data-aos-duration="1200"
      data-aos-once="true"
    >
      <div className="container mx-auto mt-10 p-10">
        <div className="border border-gray-300 rounded-sm">
          <div className="flex flex-wrap flex-col justify-between items-center sm:flex-row p-9">
            <div className="flex flex-wrap flex-col justify-between items-center sm:flex-row">
              <img
                className="rounded-full self-center"
                src={Avatar}
                alt="Avatar"
                width={120}
                height={120}
              />
              <div className="text-center mt-2 sm:text-left sm:mt-0 sm:ml-6 m-full">
                <p className="text-lg">Đỗ Tấn Phát</p>
                <span className="text-sm text-gray_7a82a6">
                  Joined in March 2019
                </span>
              </div>
            </div>
            <div className="flex flex-wrap flex-row pt-3 sm:pt-0">
              <button className="flex flex-row items-center p-2 mr-3 text-white text-sm font-semibold bg-green-500 rounded-md">
                <span className="pr-1">4.5</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
              <span className="flex flex-col justify-center text-xs opacity-60 font-semibold pr-8 text-gray_7a82a6 border-r border-gray-400 border-opacity-70">
                <b className="text-sm text-black font-semibold">22</b>
                Reviews
              </span>
              <span className="flex flex-col justify-center text-xs opacity-60 font-semibold pl-6 text-gray_7a82a6">
                <b className="text-sm text-black font-semibold">15</b>
                Listings
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutMe = (id) => {
  return (
    <div
      key={id}
      data-aos="fade-up-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
      data-aos-duration="1800"
      data-aos-once="true"
    >
      <div className="container mx-auto px-10 pb-10">
        <div className="container grid grid-flow-row grid-cols-1 gap-y-5 sm:gap-y-0 sm:grid-flow-col sm:grid-cols-5 sm:gap-x-10">
          <div className="items-center col-start-1 sm:col-start-1 sm:col-end-4 border border-gray-300 rounded-sm">
            <span className="inline-flex items-center py-5 pl-6 space-x-48 text-sm font-semibold text-bg_272b41 text-opacity-90">
              <div className="p-1 mr-3 rounded-full border-1 ring ring-orange_fa8b0c hover:ring-opacity-50">
                <FcManager size={20} />
              </div>
              About Seller
            </span>
            <p className="py-6 px-5 border-t text-sm text-gray_7a82a6 leading-7">
              Tên thật của mình là Đỗ Tấn Phát. Hiện tại đang học tại Đại học
              Công nghiệp thực phẩm. Có một sự thật thú vị rằng chỉ cần mình 101
              tuổi thì mình sẽ là công dân của 3 thế kỉ. Vậy đố các bạn năm nay
              mình bao nhiêu tuổi?
              <br />
              Công việc thường ngày của mình là ăn, học, ngủ, đọc sách và code.
              Ước mơ của mình là trở thành một Fullstack Web Developer, làm việc
              tại Nhật Bản và có một gia đình nhỏ của riêng mình. Sự thật rằng
              mình chỉ vừa bắt đầu học lập trình web 2 tháng thôi. Nhưng mình sẽ
              luôn cố gắng để thực hiện được ước mơ đó; và cũng xin cảm ơn một
              bạn nữ đã tạo động lực cho mình. Lov u so much, Tama Câu nói
              truyền cảm hứng mình thích nhất:
              <br />
              "I´m the type of person if you ask me a question, and I don´t know
              the answer, I´m gonna tell you that I don´t know. But I bet you
              what. I know how to find the answer, and I will find the answer."
              - Chris Gardner.
            </p>
          </div>

          <div className="col-start-1 sm:col-start-4 sm:col-end-6 border border-gray-300 rounded-sm h-objectFit">
            <span className="inline-flex items-center py-5 pl-6 space-x-48 text-sm font-semibold text-bg_272b41 text-opacity-90">
              <div className="p-1 mr-3 rounded-full border-1 ring ring-orange_fa8b0c hover:ring-opacity-50">
                <FcIphone size={18} />
              </div>
              Contact Info
            </span>
            <div className="flex flex-col py-6 px-5 border-t text-sm text-gray_7a82a6 space-y-3">
              <span className="inline-flex items-center">
                <div className="p-2 rounded-full bg-gray_7a82a6 bg-opacity-10">
                  <RiCompassDiscoverLine
                    size={18}
                    style={{
                      color: "#32CC0B",
                      opacity: 0.9,
                    }}
                  />
                </div>
                <span className="pl-3">Hồ Chí Minh City</span>
              </span>
              <span className="inline-flex items-center">
                <div className="p-2 rounded-full bg-gray_7a82a6 bg-opacity-10">
                  <FcIphone
                    size={18}
                    style={{
                      opacity: 0.9,
                    }}
                  />
                </div>
                <span className="pl-3">+84 826 240 270</span>
              </span>
              <span className="inline-flex items-center">
                <div className="p-2 rounded-full bg-gray_7a82a6 bg-opacity-10">
                  <AiOutlineMail
                    size={17}
                    style={{
                      color: "#f5548e",
                      opacity: 0.9,
                    }}
                  />
                </div>
                <span className="pl-3">dotanphat20@gmail.com</span>
              </span>
              <span className="inline-flex items-center pb-5 border-b">
                <div className="p-2 rounded-full bg-gray_7a82a6 bg-opacity-10">
                  <GiEarthAsiaOceania
                    size={18}
                    style={{
                      color: "#11bcd6",
                      opacity: 0.9,
                    }}
                  />
                </div>
                <a
                  rel="noopener noreferrer"
                  target={"_blank"}
                  href="https://0826240270.github.io/MyProfileWeb2/?fbclid=IwAR0byOK180qZzQ2r4z8B_zG1BbOWJ8zyweyD6Ani10EgJAPNs_1_48M4ZG4"
                  className="pl-3 overflow-hidden"
                >
                  https://0826240270.github.io/MyProfileWeb2/?fbclid=IwAR0byOK180qZzQ2r4z8B_zG1BbOWJ8zyweyD6Ani10EgJAPNs_1_48M4ZG4
                </a>
              </span>
              <div className="inline-flex justify-around items-center">
                <a
                  className="p-2 rounded-md hover:ring-2 hover:ring-blue_1170cf "
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/tphat99/"
                >
                  <FaFacebookF
                    style={{
                      color: "#1170cf",
                    }}
                  />
                </a>
                <a
                  className="p-2 rounded-md hover:ring-2 hover:ring-bg_272b41"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/0826240270"
                >
                  <GoMarkGithub
                    style={{
                      color: "#272b41",
                    }}
                  />
                </a>
                <a
                  className="p-2 rounded-md hover:ring-2 hover:ring-green_32CC0B"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="/#"
                >
                  <FcGoogle />
                </a>
                <a
                  className="p-2 rounded-md hover:ring-2 hover:ring-blue_1170cf"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/t%E1%BA%A5n-ph%C3%A1t-%C4%91%E1%BB%97-3a35891aa/"
                >
                  <FaLinkedinIn
                    style={{
                      color: "#1170cf",
                    }}
                  />
                </a>
                <a
                  className="p-2 rounded-md hover:ring-2 hover:ring-pink_f5548e"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/_ttphat_139/?fbclid=IwAR33plcVbhmCPk7os6gpEuTBIJOZJIML9qG-M5aApuIXyx3HkCRmOlhgehQ"
                >
                  <BsInstagram
                    style={{
                      color: "#f5548e",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name *"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email *"),
  phone: Yup.string()
    .matches("^[0-9]+", "You can only type number")
    .max(11, "Only less than 10 number")
    .required("Please enter your number *"),
  message: Yup.string().required("Please enter your message *"),
});

function ContactForm({ id }) {
  const [info, setInfo] = useState("");
  useEffect(() => {
    (async () => {
      try {
        let data = await fetchCart();
        setInfo(data || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const form = useRef();

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema,
  });
  return (
    <div className="container mx-auto px-10 pb-10">
      {/* Register Form */}
      <div className="grid grid-cols-6 gap-6 shadow overflow-hidden sm:rounded-md bg-white sm:px-0">
        <div className="col-span-6 lg:col-span-3 order-2 lg:order-1">
          <div
            key={id}
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1300"
            data-aos-once="true"
            className="sm:w-max md:w-auto"
          >
            <div className="py-4 ml-1">
              <h3 className="md:ml-0 text-lg font-medium leading-6 text-gray-900">
                Contact me
              </h3>
              <p className="mt-1 md:ml-0 text-sm text-[#3d424b]">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <form
              ref={form}
              onSubmit={formik.handleSubmit}
              id="contactForm"
              className="ml-1"
            >
              <div className="mb-5">
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
                  autoComplete="given-name"
                  className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={info.firstName || ""}
                  disabled
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="given-email"
                  className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={info.email || ""}
                  disabled
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="given-phone"
                  className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={info.phone || ""}
                  disabled
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                >
                  Message
                </label>
                <textarea
                  rows="10"
                  name="message"
                  id="message"
                  form="contactForm"
                  className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.message || ""}
                  placeholder="Type here..."
                ></textarea>
                {formik.touched.message && formik.errors.message ? (
                  <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                    {formik.errors.message}
                  </p>
                ) : null}
              </div>
              <div className="lg:float-right">
                <button
                  type="submit"
                  className="w-full py-2 px-4 sm:py-2 sm:px-10 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer"
                  onClick={() =>
                    sendFeedBack(info.email, formik.values.message)
                  }
                >
                  <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                    Send
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-span-6 lg:col-span-3 my-auto order-1 lg:order-2">
          <div
            // Key ID page để re-render lại nếu có sự thay đổi
            key={id}
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-once="true"
            data-aos-duration="1000"
          >
            <video
              className="max-w-full"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
              poster="https://cdnl.iconscout.com/lottie/premium/thumb/mobile-marketing-4209913-3505408.mp4"
            >
              <source
                type="video/mp4"
                src="https://cdnl.iconscout.com/lottie/premium/thumb/mobile-marketing-4209913-3505408.mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const tokenHeader = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + tokenHeader;
  const [id, setId] = useState(0);
  useEffect(() => {
    setId(Math.random());
  }, []);

  return tokenHeader ? (
    <>
      <NavPage />
      <HeaderCategories title={"Contact"} btnTitle={"Phát Đỗ"} />
      <Review id={id} />
      <AboutMe id={id} />
      <ContactForm id={id} />
      <About />
      <Footer />
    </>
  ) : (
    <Redirect to="/login" />
  );
}
