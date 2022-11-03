import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Spin } from "react-cssfx-loading";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import * as Yup from "yup";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ModalMessage } from "../../components/Modal";
import { firebaseApp } from "../../firebase/initializeApp";
import "./home.css";
import { host } from "../../api/clientAPI";

const axios = require("axios").default;
const auth = getAuth(firebaseApp);
const provider_Google = new GoogleAuthProvider();
const provider_Facebook = new FacebookAuthProvider();

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email *"),
  password: Yup.string().required("Please enter your password *"),
});

function Login() {
  // Lưu state thay đổi để aos animation được render lại
  const [pageId, setPageId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [exist_Account, setExist_Account] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // Sau khi state thay đổi thì did mound sẽ re-render lại component
  useEffect(() => {
    setPageId(Math.random());
  }, []);

  //
  const handleHistory = (is_Admin) => {
    if (!is_Admin) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };
  // Login Form
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${host}/login`, {
          email: values.email,
          password: values.password,
        })
        .then(({ data }) => {
          if (data.exist_Account) {
            const { token, exist_Account, is_Admin } = data;
            localStorage.setItem("token", token);
            setExist_Account(exist_Account);
            handleHistory(is_Admin);
          } else {
            setShowModal(!showModal);
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(`%c ${err}`, "color: red");
        });
    },
    validationSchema,
  });

  function facebookAuthen() {
    signInWithPopup(auth, provider_Facebook)
      .then(async (result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        FacebookAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const { email, displayName, photoURL } = result.user;
        let { data } = await axios.post(`${host}/facebook/oath-client`, {
          email,
          displayName,
          photoURL,
        });
        if (data) {
          localStorage.setItem("token", data.token);
          setExist_Account(data.exist_Account);
          handleHistory(data.is_Admin);
        } else {
          setShowModal(!showModal);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const { code, message, email } = error;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(code, message, email, credential);
        // ...
      });
  }

  function googleAuthen() {
    signInWithPopup(auth, provider_Google)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const { email, displayName, photoURL } = result.user;
        let { data } = await axios.post(`${host}/google/oath-client`, {
          email,
          displayName,
          photoURL,
        });
        if (data) {
          localStorage.setItem("token", data.token);
          setExist_Account(data.exist_Account);
          handleHistory(data.is_Admin);
        } else {
          setShowModal(!showModal);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const { code, message, email } = error;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(code, message, email, credential);
        // ...
      });
  }

  return (
    <div className="relative w-full h-screen">
      <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-2 absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-max">
        {/* Left animation */}
        <div
          // Key ID page để re-render lại nếu có sự thay đổi
          key={pageId}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-once="true"
          data-aos-duration="1000"
        >
          <video
            className="max-w-full md:max-w-max"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
            poster="https://cdnl.iconscout.com/lottie/premium/thumb/online-shopping-3575842-2997680.mp4"
          >
            <source
              type="video/mp4"
              src="https://cdnl.iconscout.com/lottie/premium/thumb/online-shopping-3575842-2997680.mp4"
            />
          </video>
        </div>
        {/* Right formik */}
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
          data-aos-once="true"
          className="xl:max-w-max self-center"
        >
          <div className="sm:px-6 sm:pb-5">
            <h3 className="ml-5 md:ml-0 text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 ml-5 md:ml-0 text-sm text-[#65748b]">
              Use a permanent address where you can receive mail.
            </p>
          </div>

          {/* Register Form */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
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
                        autoComplete="email"
                        className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.email}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.password}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3">
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
                        className="py-1 px-4 sm:py-3 sm:px-5 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer"
                      >
                        <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                          Sign in
                        </p>
                      </button>
                    )}

                    <Link to="/register">
                      <button className="py-1 px-4 sm:py-3 sm:px-5 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                        <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                          Register
                        </p>
                      </button>
                    </Link>
                  </div>
                  <div
                    before=" "
                    after=" "
                    className="relative text-center z-2 before:absolute before:block before:border-blue-500 before:w-2/5 before:h-1 before:top-1/2 before:left-0 before:border-2 after:block after:absolute after:border-[#B93449] after:w-2/5 after:h-1 after:top-1/2 after:right-0 after:border-2 pt-3 w-full"
                  >
                    <span className="text-sm font-semibold font-roboto text-gray_7a82a6">
                      Or
                    </span>
                  </div>
                  <div
                    className="flex justify-center items-center mt-3 w-full px-5 py-2 bg-blue-600 rounded-md cursor-pointer shadow-all-rounded hover:bg-opacity-70"
                    onClick={facebookAuthen}
                  >
                    <FaFacebook size={28} color="white" className="pr-2" />
                    <p className="text-sm font-semibold text-white font-roboto">
                      Continue with Facebook
                    </p>
                  </div>
                  <div
                    className="flex justify-center items-center mt-3 w-full px-5 py-2 rounded-md cursor-pointer shadow-all-rounded hover:bg-gray-300"
                    onClick={googleAuthen}
                  >
                    <FcGoogle size={28} color="white" className="pr-2" />
                    <p className="text-sm font-semibold font-roboto">
                      Continue with Google
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {exist_Account || (
        <ModalMessage
          showModal={showModal}
          setShowModal={setShowModal}
          caption={"Please check your email or password !"}
        />
      )}
    </div>
  );
}

export { Login };
