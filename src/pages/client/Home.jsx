import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react/swiper-react";
import { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

import { fetchProducts, getBrands } from "../../api/clientAPI";
import { Cart } from "../../components/Modal";

import { Item } from "../../components/home/Shoes";
import { NavPage, UsersContext } from "../../components/Context/NavPage";

import { AiOutlineApple, AiOutlineTwitter } from "react-icons/ai";
import { DiAndroid } from "react-icons/di";

import { FaFacebookF } from "react-icons/fa";
import { GoOctoface } from "react-icons/go";
import { TiSocialInstagram, TiSocialGooglePlus } from "react-icons/ti";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./home.css";

// Image
import banner_1 from "../../img/banner.png";
import banner_2 from "../../img/banner2.svg";
import banner_3 from "../../img/banner3.svg";
import banner_4 from "../../img/banner4.svg";
import shoes_logo_1 from "../../img/shoes_logo_1.png";
import shoes_logo_2 from "../../img/shoes_logo_2.svg";
import shoes_logo_3 from "../../img/shoes_logo_3.svg";
import shoes_logo_4 from "../../img/shoes_logo_4.svg";
import sbShape from "../../img/sb-shape.svg";
import refundIcon from "../../img/refund.png";
import paymentIcon from "../../img/payment.gif";
import deliveryIcon from "../../img/delivery.gif";
import prev from "../../img/prev.png";
import next from "../../img/next.png";
import { Popover, Transition } from "@headlessui/react";
import { io_client } from "../../socket.io/config";

const axios = require("axios").default;

export function Nav() {
  const [status, setStatus] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const countCart = useContext(UsersContext);
  let [notifications, setNotifications] = useState([]);

  useEffect(() => {
    io_client.on("notification", (data) => {
      setNotifications((notifications) => [...notifications, data]);
    });

    return () => io_client.off();
  }, [notifications]);
  console.log(
    "🚀 ~ file: Home.jsx ~ line 56 ~ Nav ~ notifications",
    notifications
  );
  return (
    <nav className="sm:sticky z-2 top-0 bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                  onClick={() => setShowMenuMobile(!showMenuMobile)}
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="/#"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-semibold"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <Link
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  to="/product"
                >
                  Product
                </Link>
                <Link
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  to="/categories"
                >
                  Categories
                </Link>
                <Link
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  to="/contact"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            <form className="hidden lg:block">
              <input
                className="text-white text-sm border-none bg-transparent mr-4 h-7 w-64 outline-none"
                placeholder="Search"
              />
            </form>
            <button
              type="button"
              className="relative bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-3"
              onClick={() => setShowCart(!showCart)}
            >
              <span className="sr-only">Shopping Cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span
                className={
                  countCart?.length && countCart[0]?.cart?.length > 0
                    ? "bg-[#ffb020] absolute top-0 right-0 p-1 rounded-full animate-ping"
                    : ""
                }
              ></span>
            </button>
            <Popover>
              <Popover.Button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>

                <svg
                  className={
                    Object.keys(notifications).length
                      ? "animate-pulse h-6 w-6"
                      : "h-6 w-6"
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={
                    Object.keys(notifications).length
                      ? "#fa8b0c"
                      : "currentColor"
                  }
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-2 mt-3 right-0 w-screen max-w-sm  transform px-4 sm:px-0 lg:max-w-xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-8 bg-white p-7 ">
                      {notifications?.map((item, index) => (
                        <div
                          key={index}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <item.icon aria-hidden="true" />
                          </div> */}
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              Payment notification
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4">
                      <a
                        href="##"
                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <span className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            Documentation
                          </span>
                        </span>
                        <span className="block text-sm text-gray-500">
                          Start integrating products and tools
                        </span>
                      </a>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            <div className="ml-3 relative">
              <div onClick={() => setStatus(!status)}>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={countCart.length && countCart[0]?.avatar}
                    alt="avatar"
                  />
                </button>
              </div>
              <div
                className={
                  (status ? "block" : "hidden") +
                  " origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                }
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <a
                  href="/#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="/#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700"
                  to="/login"
                  onClick={() => localStorage.clear()}
                >
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div
          className={
            (showMenuMobile ? "hidden " : "") + "px-2 pt-2 pb-3 space-y-1"
          }
        >
          <a
            href="/#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="/#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>

          <a
            href="/#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>

          <a
            href="/#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a>
          <div className="px-2 pt-2 pb-3">
            <form>
              <input
                className="text-gray-300 border-input bg-transparent outline-none mr-4 h-7 w-full placeholder-center"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
      </div>
      <Cart open={showCart} setOpen={setShowCart} />
    </nav>
  );
}

function Header() {
  const SPECIAL_LIST = [
    {
      info_1: "Men shoes",
      total: "0/2",
      info_2: "Men shoes",
      first_title: "New Running Shoes",
      second_title: "Men's Like Plex",
      description:
        "New Running ShoesMen's Like Plexipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      banner: banner_1,
      shoes_logo: shoes_logo_1,
      text_color: "text-gray_7a82a6",
    },
    {
      info_1: "Men shoes",
      total: "0/2",
      info_2: "Men shoes",
      first_title: "New Running Shoes",
      second_title: "Men's Like Plex",
      description:
        "New Running ShoesMen's Like Plexipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      banner: banner_2,
      shoes_logo: shoes_logo_2,
      text_color: "text-white",
    },
    {
      info_1: "Men shoes",
      total: "0/2",
      info_2: "Men shoes",
      first_title: "New Running Shoes",
      second_title: "Men's Like Plex",
      description:
        "New Running ShoesMen's Like Plexipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      banner: banner_3,
      shoes_logo: shoes_logo_3,
      text_color: "text-white",
    },
    {
      info_1: "Men shoes",
      total: "0/2",
      info_2: "Men shoes",
      first_title: "New Running Shoes",
      second_title: "Men's Like Plex",
      description:
        "New Running ShoesMen's Like Plexipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      banner: banner_4,
      shoes_logo: shoes_logo_4,
      text_color: "text-white",
    },
  ];
  return (
    <>
      {/* Khung */}
      {/* 3 items headers */}
      <Swiper
        spaceBetween={60}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        rewind={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper z-0"
      >
        {SPECIAL_LIST &&
          SPECIAL_LIST.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-auto"
                style={{
                  backgroundImage: `url(${item.banner})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="w-full mx-auto">
                  <div className="px-5">
                    <div className="flex flex-col md:flex-row justify-between items-center py-7 gap-y-5 lg:gap-y-0">
                      {/* Flex items 1 */}
                      <div className="hidden lg:block flex-col items-center py-5 pl-10">
                        <p className={`w-max mb-36 mx-5 ${item.text_color}`}>
                          {item.info_1}
                        </p>
                        <div className="grid place-content-center w-full">
                          <div className="w-12 h-12 rounded-full border-2 border-red-500">
                            <span className="grid place-items-center h-full w-full text-center text-white">
                              {item.total}
                            </span>
                          </div>
                        </div>
                        <p
                          className={`w-max mt-36 mb-4 mx-5 ${item.text_color}`}
                        >
                          {item.info_2}
                        </p>
                      </div>

                      {/* Flex items 2 */}
                      <div className="flex flex-col flex-grow lg:flex-grow-0 max-w-md mr-0 lg:mr-28">
                        <p className="text-2xl md:text-4xl text-red-400 transition-all duration-1000 tracking-wider md:ease-in-out">
                          {item.first_title}
                        </p>
                        <p className="font-extrabold text-white pt-2 transition-all duration-1000 text-4xl md:text-5xl ease-in md:ease-in-out">
                          {item.second_title}
                        </p>
                        <p className="hidden lg:block text-white text-sm py-5 font-Inter">
                          {item.description}
                        </p>
                        <div className="hidden md:block">
                          <div className="mt-5 lg:mt-0 flex flex-row items-center w-full">
                            <a
                              href="/#"
                              className="w-max py-2 px-4 sm:py-2 sm:px-10 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-red-500 cursor-pointer"
                            >
                              <p className="w-max text-center font-Inter font-semibold text-white">
                                Buy now
                              </p>
                            </a>
                            <a
                              href="/#"
                              className="w-max py-2 px-4 ml-6 sm:py-2 sm:px-10 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-red-500 cursor-pointer"
                            >
                              <p className="w-max text-center font-Inter font-semibold text-white">
                                See more
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Flex items 3 */}
                      <div className="sm:w-1/3 flex-grow lg:flex-grow-0 transition-transform -translate-y-10 animate-bounce-slow">
                        <img src={item.shoes_logo} alt="Shoes logo" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

function Products() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await fetchProducts();
      setProducts(result?.splice(0, 6) || []);
    })();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center pb-32 border-b-2 border-pink_f5548e">
      <div className="pt-20 text-center leading-10 pb-5">
        <p className="text-xl sm:text-4xl font-semibold">
          Best Listings Around The World
        </p>
        <span className="text-base text-gray-400">
          Explore the popular listings around the world
        </span>
      </div>
      <div className="container md:w-auto grid grid-cols px-8 sm:px-0 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-14">
        <Item products={products} />
      </div>
      <Link
        to="/categories"
        className="p-3 mt-10 text-center text-sm text-yellow-50 font-semibold bg-gradient-to-r from-pink_f5548e to-orange_fa8b0c hover:from-orange_fa8b0c hover:to-pink_f5548e rounded-lg"
      >
        Explore All 200+
      </Link>
    </div>
  );
}

function Section3() {
  const services = [
    {
      title: "Free Shipping",
      logo: deliveryIcon,
      description:
        "Time won't wait anyone. Fast deleviry any time you need and any where you go",
    },
    {
      title: "Cach on delivery",
      logo: paymentIcon,
      description:
        "The Internet Tend To Repeat, payment by wallet online, fast and convinient",
    },
    {
      title: "45 days return",
      logo: refundIcon,
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.",
    },
  ];

  return (
    <div className="flex-columns justify-center items-center pt-16 pb-16 border-b-2">
      {/* Heading title */}
      <div className="text-center leading-10">
        <p className="text-4xl">
          Why <span className="text-pink-400">Direo</span> for your Business?
        </p>
        <p className="text-gray-400">
          Explore the popular listings around the world
        </p>
      </div>
      <div className="grid xl:grid-cols-2 sm:grid-cols-1">
        {/* Left */}
        <div
          data-aos="zoom-in"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1200"
          className="col-span-1 sm:justify-self-center xl:justify-self-end"
        >
          <video
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
            poster="https://assets1.lottiefiles.com/render/ksd5oyhj.png"
          >
            <source
              type="video/mp4"
              src="https://assets3.lottiefiles.com/render/ksd5oyhj.mp4"
            />
          </video>
        </div>
        {/* Right */}
        <div
          data-aos="zoom-out"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
          className="col-span-1 mt-8 sm:mt-20 ml-14 sm:justify-self-center xl:justify-self-start"
        >
          <div className="grid grid-flow-row h-full">
            {services &&
              services.map((item, index) => (
                <div
                  className="flex justify-center items-center w-4/5 pb-5"
                  key={index}
                >
                  <div className="flex justify-center items-baseline sm:items-center w-16 h-full sm:h-12 mr-8 sm:mr-0">
                    <img src={item.logo} alt="Icon" />
                  </div>
                  <div className="block leading-8 ml-5">
                    <p className="text-lg">{item.title}</p>
                    <span className="overflow-ellipsis text-gray-400">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            <div className="flex justify-start items-center text-white text-sm pt-6">
              <a
                className="p-2 md:p-3 lg:p-3 bg-green-500 rounded-md font-semibold hover:bg-green-600"
                href="/#"
              >
                See our Pricing
              </a>
              <a
                className="p-2 md:p-3 lg:p-3 ml-5 bg-pink-500 rounded-md font-semibold hover:bg-pink-600"
                href="/#"
              >
                Submit Listings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section4(props) {
  let [products, setProducts] = useState([]);
  const swiper = useSwiper();
  useEffect(() => {
    (async () => {
      let products = await fetchProducts();
      setProducts(products?.slice(0, 8));
    })();
  }, []);
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <div className="flex flex-col justify-center items-center pb-10 max-w-max mx-auto">
        <SwiperSlide>
          <div className="pt-10 text-center leading-10">
            <div className="flex justify-center items-end">
              <button
                className="h-full mr-16 opacity-50 hover:opacity-100 cursor-pointer"
                onClick={() => swiper.slideNext()}
              >
                <img
                  src={prev}
                  alt="previous"
                  style={{
                    width: "50px",
                    height: "26px",
                  }}
                />
              </button>

              <p className="text-4xl tracking-wider">Coming Products</p>
              <button
                className="h-full ml-16 opacity-50 hover:opacity-100 cursor-pointer"
                onClick={() => swiper.slideNext()}
              >
                <img
                  src={next}
                  alt="next"
                  style={{
                    width: "50px",
                    height: "26px",
                  }}
                />
              </button>
            </div>
            <p className="text-gray-400">
              Explore best listings around the world by city
            </p>
          </div>
          <div className="max-w-2xl mx-auto pt-6 pb-24 md:pb-16 px-8 sm:px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products &&
                products.map((product, index) => (
                  <a key={index} href={product.href} className="group">
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <img
                        src={product.path}
                        alt="product img"
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <div className="flex justify-start items-center">
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {product.price}
                      </p>
                      <del className="mt-1 ml-8 text-lg font-medium text-gray-400">
                        $12334
                      </del>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <>
            <div className=" pt-10 text-center leading-10">
              <div className="flex justify-center items-end">
                <div className="h-full mr-16 opacity-50 hover:opacity-100 cursor-pointer">
                  <img
                    src={prev}
                    alt="previous"
                    style={{
                      width: "50px",
                      height: "26px",
                    }}
                    onClick={() => swiper.slideNext()}
                  />
                </div>

                <p className="text-4xl tracking-wider">Latest Products</p>
                <div className="h-full ml-16 opacity-50 hover:opacity-100 cursor-pointer">
                  <img
                    src={next}
                    alt="next"
                    style={{
                      width: "50px",
                      height: "26px",
                    }}
                    onClick={() => swiper.slideNext()}
                  />
                </div>
              </div>
              <p className="text-gray-400">
                Explore best listings around the world by city
              </p>
            </div>
            <div className="max-w-2xl mx-auto pt-6 pb-24 md:pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products &&
                  products.map((product, index) => (
                    <a key={index} href={product.href} className="group">
                      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={product.path}
                          alt="product img"
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">
                        {product.name}
                      </h3>
                      <div className="flex justify-start items-center">
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          {product.price}
                        </p>
                        <del className="mt-1 ml-8 text-lg font-medium text-gray-400">
                          $12334
                        </del>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </>
        </SwiperSlide>

        <div className="text-center mt-10 leading-10">
          <p className="text-xl sm:text-4xl">Trusted By Over 4000+ Users</p>
          <p className="text-sm pt-2 sm:text-lg text-gray-400">
            Here is what people say about Direo
          </p>
        </div>
        {props.children}
      </div>
    </Swiper>
  );
}

function Section5() {
  const content = [
    {
      image:
        "https://images.unsplash.com/photo-1635340245676-b097d28a2257?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Francis Burton",
      name: "Toronto, Canada",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit anim laborum sint occaecat cupidatat non proident. Occaecat cupidatat non proident culpa officia deserunt mollit.",
      button: "More",
    },
    {
      image:
        "https://images.unsplash.com/photo-1635340245676-b097d28a2257?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Francis Burton",
      name: "Toronto, Canada",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit anim laborum sint occaecat cupidatat non proident. Occaecat cupidatat non proident culpa officia deserunt mollit.",
      button: "More",
    },
    {
      image:
        "https://images.unsplash.com/photo-1635340245676-b097d28a2257?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Francis Burton",
      name: "Toronto, Canada",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit anim laborum sint occaecat cupidatat non proident. Occaecat cupidatat non proident culpa officia deserunt mollit.",
      button: "More",
    },
  ];
  return (
    <Slider autoplay={3000}>
      {content.map((item, index) => (
        <div className="flex flex-col justify-center items-center" key={index}>
          <div
            className="center w-24 h-24 rounded-full"
            style={{
              background: `url('${item.image}') no-repeat center center`,
              backgroundSize: "cover",
            }}
          />
          <div className="text-center">
            <h1 className="font-bold">{item.title}</h1>
            <p className="text-sm text-gray-400">{item.name}</p>
          </div>
          <p className="mt-10 text-center tracking-wide text-gray-400">
            {item.description}
          </p>
        </div>
      ))}
    </Slider>
  );
}

function Section6() {
  let [brands, setBrands] = useState([]);
  useEffect(() => {
    (async () => {
      setBrands(await getBrands());
    })();
  }, []);
  return (
    <div className="ml-10">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper pb-10 z-0"
      >
        {brands &&
          brands.map((items, index) => (
            <SwiperSlide key={index}>
              <a href={items.about}>
                <img
                  className="w-32 h-20 md:w-48 md:h-36 opacity-50 hover:opacity-100 cursor-pointer"
                  src={items.logo}
                  alt="Shoes band"
                />
              </a>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

function Section7() {
  return (
    <div className="container flex flex-col justify-center items-center px-5 pt-10 pb-6 mx-auto bg-repeat bg-cover bg-center">
      <div className="text-center leading-10 pb-6">
        <p className="text-3xl">Subscribe to Newsletter</p>
        <p className="text-gray_7a82a6 pt-2">
          Subscribe to get update and information. Don't worry, we won't send
          spam!
        </p>
      </div>
      <form className="flex justify-center items-center relative font-normal text-base">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hidden sm:block absolute left-8 top-3 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <input
          className="rounded-l-full text-gray_7a82a6 text-opacity-50 outline-none py-3 px-8 sm:px-16 shadow-2xl focus:placeholder-transparent"
          type="text"
          placeholder="Enter your email"
        />
        <input
          className="text-sm font-bold text-white rounded-r-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 py-3 px-6 cursor-pointer"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export function About() {
  return (
    <div className="container grid grid-cols-2 lg:grid-cols-4 md:gap-y-6 sm:grid-cols-2 sm:gap-y-8 max-w-5xl mx-auto pt-10 pb-10 border-b-2 border-gray-400">
      <ul className="mx-auto leading-8 tracking-wider">
        <li className="text-base font-bold pb-4 cursor-default">
          Company Info
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            About Us
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Contact Us
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Our Listings
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Our Pricings{" "}
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Support
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Privacy Policy
          </a>
        </li>
      </ul>

      <ul className="mx-auto leading-8 tracking-wider">
        <li className="text-base font-bold pb-4 cursor-default">
          Helpful Links
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Join Direo
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Sign In
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            How it Work
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Advantages{" "}
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Direo App
          </a>
        </li>
        <li className="font-normal text-gray_7a82a6">
          <a className="hover:text-pink_f5548e" href="/#">
            Packages
          </a>
        </li>
      </ul>

      <ul className="pt-5 sm:pt-0 pl-8 mx-auto leading-10 tracking-wider">
        <li className="text-base font-bold pb-3 sm:pb-4 cursor-default">
          Connect with Us
        </li>
        <li className="flex items-center font-normal text-gray_7a82a6">
          <div className="p-1 bg-gray-200 mr-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-pink_f5548e"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
          <a className="hover:text-pink_f5548e" href="/#">
            Contact Support
          </a>
        </li>
        <li className="flex items-center font-normal text-gray_7a82a6">
          <div className="p-1 text-blue-400 bg-gray-200 mr-2 rounded-full">
            <AiOutlineTwitter size={16} />
          </div>
          <a className="hover:text-pink_f5548e" href="/#">
            Twitter
          </a>
        </li>
        <li className="flex items-center font-normal text-gray_7a82a6">
          <div className="p-1 text-blue-500 bg-gray-200 mr-2 rounded-full">
            <FaFacebookF size={15} />
          </div>
          <a className="hover:text-pink_f5548e" href="/#">
            Facebook
          </a>
        </li>
        <li className="flex items-center font-normal text-gray_7a82a6">
          <div className="p-1 text-pink-400 bg-gray-200 mr-2 rounded-full">
            <TiSocialInstagram size={16} />
          </div>
          <a className="hover:text-pink_f5548e" href="/#">
            Instagram
          </a>
        </li>
        <li className="flex items-center font-normal text-gray_7a82a6">
          <div className="p-1 text-red-500 bg-gray-200 mr-2 rounded-full">
            <TiSocialGooglePlus size={18} />
          </div>
          <a className="hover:text-pink_f5548e" href="/#">
            Google+
          </a>
        </li>
      </ul>

      <ul className="pt-5 sm:pt-0 sm:mx-auto sm:leading-8 sm:tracking-wider">
        <li className="text-left text-base font-bold sm:py-0 pb-2 sm:pb-4 cursor-default">
          Direo on Mobile
        </li>
        <p className="text-left font-normal text-gray_7a82a6 cursor-default pt-5 sm:pt-0">
          Download the Direo app today so you can find your events anytime,
          anywhere.
        </p>
        <div className="sm:inline-flex justify-center items-center grid-cols-2 w-full sm:w-max mt-3 text-white">
          <div className="inline-flex items-center py-2 px-3 bg-gray-500 rounded-md bg-gradient-to-r from-pink_f5548e to-orange_fa8b0c cursor-pointer">
            <span>
              <AiOutlineApple size={18} />
            </span>
            <span className="ml-1">App Store</span>
          </div>
          <div className="inline-flex items-center p-2 mt-4 sm:mt-0 sm:ml-3 bg-bg_272b41 rounded-md cursor-pointer">
            <span>
              <DiAndroid size={16} />
            </span>
            <span className="ml-1">Google play</span>
          </div>
        </div>
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <div className="container flex justify-around lg:justify-around items-center sm:justify-between w-full mx-auto pt-2 h-20 sm:px-10">
      <div className="hidden sm:flex items-center">
        <img
          className="block h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt="Workflow"
        />
        <span className="ml-5 text-gray_7a82a6">©2019 Direo. </span>
      </div>
      <div className="inline-flex items-center">
        <span className="px-2 pb-1">
          <GoOctoface className="text-purpel_903af9" size={20} />
        </span>
        <span className="text-gray_7a82a6">Made with by Phát Đỗ</span>
      </div>
      <a
        href="/#"
        className="hidden sm:block rounded-md py-2 px-4 text-white bg-bg_272b41"
      >
        English
      </a>
    </div>
  );
}

function Home() {
  const tokenHeader = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + tokenHeader;
  return tokenHeader ? (
    <>
      <NavPage />
      <Header />

      <section>
        <Products />
      </section>

      <section>
        <Section3 />
      </section>

      <section>
        <Section4>{<Section5 />}</Section4>
      </section>

      <section>
        <Section6 />
      </section>

      <section
        style={{
          backgroundImage: `url(${sbShape})`,
          paddingBottom: "6rem",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Section7 />
      </section>

      <section>
        <About />
      </section>
      <Footer />
    </>
  ) : (
    <Redirect to="/login" />
  );
}

export { Home };
