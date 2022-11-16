import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { FadingBalls } from "react-cssfx-loading/lib";

// Icons
import { Bar, Doughnut } from "react-chartjs-2";
import { Switch, Route, Link } from "react-router-dom";
import { FcManager } from "react-icons/fc";
import { GoGraph, GoRepoClone } from "react-icons/go";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { GiExitDoor, GiRose, GiProgression } from "react-icons/gi";
import { VscRuby } from "react-icons/vsc";
import { BiBell } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import {
  MdSupervisedUserCircle,
  MdAttachMoney,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

// Site
import { InsertProduct, ProductsSite } from "./Products";
import { CustomersSite } from "./Customers";
import { AccountSite } from "./Account";
import { CouponSite, InsertCoupon, UpdateCoupon } from "./Coupon";
import { fetchUser } from "../../api/adminAPI";

import { io_admin } from "../../socket.io/config";

const axios = require("axios").default;

// Menu công cụ bên trái của Admin
function AdminSidebar({ id }) {
  return (
    <div className="hidden lg:block bg-[#111827] overflow-y-scroll">
      <div className="flex flex-col">
        {/* Head left side admin */}
        <div className="py-5">
          <img
            className="h-8 ml-10"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow"
          />
        </div>
        <div className="px-4">
          <div
            className="flex justify-between items-center w-60 px-6 py-3 rounded-lg bg-[#1a212f]"
            key={id}
            data-aos="flip-up"
            data-aos-offset="600"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1400"
            data-aos-once="true"
          >
            <span className="block text-white">
              <p className="text-lg font-Inter">Phát Đỗ</p>
              <span className="text-sm text-gray_7a82a6 font-normal font-Inter">
                Your tier : Premium
              </span>
            </span>
            <div className="p-1 mr-3 rounded-full border-1 ring ring-orange_fa8b0c hover:ring-opacity-50">
              <FcManager size={20} />
            </div>
          </div>
        </div>

        {/* Section left side admin */}
        <div className="mt-5 border-b border-t border-gray_7a82a6 border-opacity-30 pb-3">
          <div className="px-4 pt-3">
            <ul className="grid grid-flow-row list-none gap-y-2">
              <Link to="/dashboard">
                <li
                  className="text-[#c8cdd3] inline-flex items-center w-full px-6 py-3 hover:bg-[#242a38] rounded-md cursor-pointer hover:text-[#10b981] transition-colors duration-300"
                  key={id}
                  data-aos="fade-right"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1400"
                  data-aos-once="true"
                >
                  <GoGraph size={20} />
                  <span className="text-sm font-semibold pl-3 font-Inter">
                    Dashboard
                  </span>
                </li>
              </Link>
              <Link to="/dashboard/customers">
                <li
                  className="text-[#c8cdd3] inline-flex items-center w-full px-6 py-3 hover:bg-[#242a38] rounded-md cursor-pointer hover:text-[#10b981] transition-colors duration-300"
                  key={id}
                  data-aos="fade-right"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1600"
                  data-aos-once="true"
                >
                  <FiUsers size={20} />
                  <span className="text-sm font-semibold pl-3 font-Inter">
                    Customer
                  </span>
                </li>
              </Link>
              <Link to="/dashboard/products">
                <li
                  className="text-[#c8cdd3] inline-flex items-center w-full px-6 py-3 hover:bg-[#242a38] rounded-md cursor-pointer hover:text-[#10b981] transition-colors duration-300"
                  key={id}
                  data-aos="fade-right"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1800"
                  data-aos-once="true"
                >
                  <GoRepoClone size={20} />
                  <span className="text-sm font-semibold pl-3 font-Inter">
                    Products
                  </span>
                </li>
              </Link>
              <Link to="/dashboard/account">
                <li
                  className="text-[#c8cdd3] inline-flex items-center w-full px-6 py-3 hover:bg-[#242a38] rounded-md cursor-pointer hover:text-[#10b981] transition-colors duration-300"
                  key={id}
                  data-aos="fade-right"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="2000"
                  data-aos-once="true"
                >
                  <MdOutlineManageAccounts size={24} className="-ml-1" />
                  <span className="text-sm font-semibold pl-3 font-Inter">
                    Account
                  </span>
                </li>
              </Link>
              <Link to="/dashboard/coupon">
                <li
                  className="text-[#c8cdd3] inline-flex items-center w-full px-6 py-3 hover:bg-[#242a38] rounded-md cursor-pointer hover:text-[#10b981] transition-colors duration-300"
                  key={id}
                  data-aos="fade-right"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="2200"
                  data-aos-once="true"
                >
                  <RiCoupon2Line size={23} className="-ml-2" />
                  <span className="text-sm font-semibold pl-3 font-Inter">
                    Coupon
                  </span>
                </li>
              </Link>

              <Link to="/register">
                <li
                  className="text-[#c8cdd3] inline-flex items-center w-full px-6 py-3 hover:bg-[#242a38] rounded-md cursor-pointer hover:text-[#10b981] transition-colors duration-300"
                  key={id}
                  data-aos="fade-right"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="2400"
                  data-aos-once="true"
                >
                  <FiUserPlus size={21} className="-ml-1" />
                  <span className="text-sm font-semibold pl-3 font-Inter">
                    Register
                  </span>
                </li>
              </Link>

              <Link to="/login">
                <li
                  className="text-[#c8cdd3] inline-flex items-center w-full px-6 py-3 hover:bg-[#242a38] rounded-md cursor-pointer hover:text-[#10b981] transition-colors duration-300"
                  key={id}
                  data-aos="fade-right"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="2600"
                  data-aos-once="true"
                >
                  <GiExitDoor size={23} className="-ml-2" />
                  <span className="text-sm font-semibold pl-3 font-Inter">
                    Log out
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component biểu đồ Chart Bar and Doughnut tròn
function Chart() {
  const chartToday = {
    label: "Today",
    data: [50, 50, 50, 50],
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderWidth: 1,
    borderRadius: 2,
    barPercentage: 0.5,
    hoverBorderWidth: 2,
    hoverBorderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 159, 64, 1)",
    ],
  };

  const chartYesterday = {
    label: "Yesterday",
    data: [20, 19, 20, 20],
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderWidth: 1,
    borderRadius: 2,
    barPercentage: 0.5,
    hoverBorderWidth: 2,
    hoverBorderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 159, 64, 1)",
    ],
  };
  return (
    <div className="flex flex-wrap flex-col sm:flex-row">
      {/* Chart Bar thống kê số liệu */}
      <div className="w-full h-auto md:w-1/2">
        <div className="mt-5 sm:mt-0 px-3 py-3 sm:px-6 sm:py-8 border-b border-gray_7a82a6 border-opacity-20 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="font-Inter font-semibold text-lg">Latest Sales</p>
            <span className="font-Inter font-semibold text-xs text-[#5850e6]">
              Last 7 days
            </span>
          </div>
        </div>
        <div className="mt-7">
          <Bar
            data={{
              labels: [
                "Buget",
                "Total Customers",
                "Task Progress",
                "Total Profit",
              ],
              datasets: [chartToday, chartYesterday],
            }}
          />
        </div>
      </div>

      {/* Chart Donut thống kê số liệu */}
      <div className="w-full md:w-1/2">
        <div className="mt-5 sm:mt-0 px-3 py-3 sm:px-6 sm:py-8 border-b border-gray_7a82a6 border-opacity-20 shadow-lg">
          <p className="font-Inter font-semibold text-lg">Traffic by Device</p>
        </div>
        <div className="mt-7 w-full">
          <Doughnut
            data={{
              labels: [
                "Buget",
                "Total Customers",
                "Task Progress",
                "Total Profit",
              ],
              datasets: [chartToday, chartYesterday],
            }}
            // Set size ổn trên web còn mobile thì bể
            options={{
              maintainAspectRatio: false,
            }}
            height={450}
            // Responsive cho mobile đối với web thì height dài quá
            // options={{
            //   responsive: true,
            //   maintainAspectRatio: false,
            // }}
            // height={450}
          />
        </div>
      </div>
    </div>
  );
}

// Component thống kê cho Dashboard site
function TotalCalculate() {
  let [totalCus, setTotalCus] = useState({});
  useEffect(() => {
    let id = setInterval(() => {
      io_admin.emit("dashboard:statistical");
      io_admin.on("statistical", (data) => {
        setTotalCus(data);
      });
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap flex-grow">
      {/* Doanh số chi tiết thống kê */}
      <div className="md:min-w-[50%] lg:min-w-[25%]">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <span className="leading-10 text-left pl-6 pt-6">
              <p className="font-Inter font-bold text-xs text-[#65748b] text-opacity-70">
                BUDGET
              </p>
              {!totalCus.statistical ? (
                <div className="h-10 mt-1 flex justify-items-center items-center">
                  <FadingBalls color="black" />
                </div>
              ) : (
                <p className="font-Inter font-bold text-3xl text-black mt-2">
                  ${totalCus.statistical}k{" "}
                </p>
              )}
            </span>
            <div className="p-3 rounded-full bg-[#d14343]">
              <MdAttachMoney size={26} style={{ color: "white" }} />
            </div>
          </div>
          <div className="inline-flex ml-5 mt-3 items-center gap-x-1">
            <AiOutlineArrowDown size={22} style={{ color: "red" }} />
            <span className="text-red-700 text-sm">12%</span>
            <span className="text-xs text-gray_7a82a6">Since last month</span>
          </div>
        </div>
      </div>
      <div className="md:min-w-[50%] lg:min-w-[25%]">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <span className="leading-10 text-left pl-6 pt-6">
              <p className="font-Inter font-semibold text-xs text-[#65748b] text-opacity-70">
                TOTAL CUSTOMERS
              </p>
              {!totalCus.totalCustomers ? (
                <div className="h-10 mt-1 flex justify-items-center items-center">
                  <FadingBalls color="black" />
                </div>
              ) : (
                <p className="font-Inter font-bold text-3xl text-black mt-2">
                  {totalCus.totalCustomers >= 1000
                    ? totalCus.totalCustomers + "k"
                    : totalCus.totalCustomers}
                </p>
              )}
            </span>
            <div className="p-3 rounded-full bg-[#14b8a6]">
              <MdSupervisedUserCircle size={26} style={{ color: "white" }} />
            </div>
          </div>
          <div className="inline-flex ml-5 mt-3 items-center gap-x-1">
            <AiOutlineArrowUp size={22} style={{ color: "green" }} />
            <span className="text-green-600 text-sm">12%</span>
            <span className="text-xs text-gray_7a82a6">Since last month</span>
          </div>
        </div>
      </div>
      <div className="md:min-w-[50%] lg:min-w-[25%]">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <span className="leading-10 text-left pl-6 pt-6">
              <p className="font-Inter font-semibold text-xs text-[#65748b] text-opacity-70">
                TASKS PROGRESS
              </p>
              <p className="font-Inter font-bold text-3xl text-black mt-2">
                $24k
              </p>
            </span>
            <div className="p-3 rounded-full bg-[#ffb020]">
              <GiProgression size={25} style={{ color: "white" }} />
            </div>
          </div>
          <div className="mt-3">
            <span
              className="relative block mt-6 h-1 w-1/3 rounded-lg bg-purpel_903af9
              bg-opacity-40 overflow-hidden"
            >
              <span className="absolute left-0 top-0 bottom-0 w-full transform -translate-x-40 bg-purpel_903af9"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="md:min-w-[50%] lg:min-w-[25%]">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <span className="leading-10 text-left pl-6 pt-6">
              <p className="font-Inter font-semibold text-xs text-[#65748b] text-opacity-70">
                TOTAL PROFIT
              </p>
              {!totalCus.statistical ? (
                <div className="h-10 mt-1 flex justify-items-center items-center">
                  <FadingBalls color="black" />
                </div>
              ) : (
                <p className="font-Inter font-bold text-3xl text-black mt-2">
                  ${totalCus.statistical}k{" "}
                </p>
              )}
            </span>
            <div className="p-3 rounded-full bg-[#5048e5]">
              <GiRose size={30} style={{ color: "white" }} />
            </div>
          </div>
          <div className="inline-flex ml-5 mt-3 items-center gap-x-1">
            <AiOutlineArrowDown size={22} style={{ color: "red" }} />
            <span className="text-red-700 text-sm">12%</span>
            <span className="text-xs text-gray_7a82a6">Since last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Trang Dashboard
function DashboardSite() {
  return (
    <div className="px-6 pt-5">
      {/* Doanh số chi tiết thống kê */}
      <TotalCalculate />

      {/* Chart biểu đồ biển diễn  */}
      <Chart />
    </div>
  );
}

// AdminArticle
function AdminArticle({ account }) {
  let [notifications, setNotifications] = useState({});
  useEffect(() => {
    io_admin.on("notification", (data) => {
      setNotifications(data);
    });
    console.log(
      "🚀 ~ file: Dashboard.jsx ~ line 472 ~ AdminArticle ~ notifications",
      notifications
    );
  }, [notifications]);

  return (
    <div className="col-start-1 col-end-3 lg:col-start-2 lg:col-end-3">
      <div className="px-5">
        <nav className="flex justify-between items-center min-h-[64px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-5"
            viewBox="0 0 20 20"
            fill="#7a82a6"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <div className="inline-flex justify-around items-center gap-x-5 mr-2">
            <button className="p-3 rounded-full hover:bg-[#c8cdd3] hover:bg-opacity-50">
              <VscRuby
                size={20}
                style={{
                  color: "black",
                  alignSelf: "center",
                  width: "100%",
                }}
              />
            </button>
            <button className="p-3 rounded-full hover:bg-[#c8cdd3] hover:bg-opacity-50">
              <BiBell
                size={20}
                style={{
                  color: "black",
                  alignSelf: "center",
                  width: "100%",
                }}
              />
            </button>
            <div className="hover:ring hover:ring-[#6366f1] hover:rounded-full hover:ring-opacity-60 cursor-pointer w-10 h-10 flex justify-center">
              <img
                className="rounded-full"
                src={account?.avatar}
                alt="Avatar"
              />
            </div>
          </div>
        </nav>
      </div>

      <Switch>
        <Route exact path="/dashboard" component={DashboardSite} />
        <Route exact path="/dashboard/account" component={AccountSite} />
        <Route exact path="/dashboard/customers" component={CustomersSite} />
        <Route exact path="/dashboard/products" component={ProductsSite} />
        <Route exact path="/dashboard/coupon" component={CouponSite} />
        <Route exact path="/dashboard/coupon/insert" component={InsertCoupon} />
        <Route
          exact
          path="/dashboard/products/insert"
          component={InsertProduct}
        />
        <Route
          path="/dashboard/coupon/:_code"
          render={(props) => <UpdateCoupon {...props} />}
        />
      </Switch>
    </div>
  );
}

function Dashboard() {
  let [id, setId] = useState(0);
  let [account, setAccount] = useState({});
  const tokenHeader = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + tokenHeader;

  useEffect(() => {
    (async () => {
      setAccount(await fetchUser());
    })();
    setId(Math.random());
  }, []);

  return tokenHeader ? (
    <div className="grid grid-flow-row sm:grid-flow-col auto-cols-fr sm:auto-cols-grid-admin h-screen">
      <AdminSidebar id={id} />
      <AdminArticle account={account} />
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export { Dashboard };
