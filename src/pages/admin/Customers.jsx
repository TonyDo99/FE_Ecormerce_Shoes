import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchCustomers } from "../../api/adminAPI";

function Table({ name, id }) {
  const [listAccount, setListAccount] = useState([]);
  useEffect(() => {
    fetchCustomers()
      .then((cus) => {
        setListAccount(cus);
      })
      .catch((err) => {
        console.log(`%c ${err}`, "color: red");
      });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border border-gray-300 border-opacity-50 sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray_7a82a6 tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray_7a82a6 tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray_7a82a6 tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray_7a82a6 tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="font-semibold sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                key={id}
                data-aos="fade-left"
                data-aos-offset="400"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1200"
                data-aos-once="true"
              >
                {listAccount &&
                  listAccount
                    .filter((item) =>
                      item
                        ? item?.firstName
                            .toLowerCase()
                            .includes(name.toLowerCase())
                        : name === ""
                    )
                    .map((info, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={info.avatar}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                <span>{info.firstName}</span>
                                <span className="pl-2">{info.lastName}</span>
                              </div>
                              <div className="text-sm text-gray_7a82a6">
                                {info.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            Regional Paradigm Technician
                          </div>
                          <div className="text-sm text-gray_7a82a6">
                            {info.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {info.phone}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray_7a82a6">
                          {info.is_Admin ? "Admin" : "Customer"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="/#"
                            className="text-indigo-600 hover:text-indigo-900 font-semibold"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpSearch({ headTitle, upTitle, placeSearch, setSearch, path }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-Inter font-bold text-3xl">{headTitle}</p>
        <Link to={`${path}`}>
          <button className="font-Inter text-white font-bold px-4 py-2 bg-[#5048e5] rounded-lg text-sm">
            {upTitle}
          </button>
        </Link>
      </div>
      <div className="py-8">
        <input
          className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 border-opacity-50 rounded-md w-full lg:w-1/3 px-4 py-2"
          type="text"
          id="searchCustomer"
          name="searchCustomer"
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeSearch}
        />
      </div>
    </>
  );
}

function CustomersSite() {
  let [search, setSearch] = useState("");
  let [id, setId] = useState(0);
  useEffect(() => {
    setId(Math.random());
  }, []);
  return (
    <div className="pt-10 px-8 mx-auto w-full">
      <UpSearch
        upTitle={"Add Custormers"}
        headTitle={"Customers"}
        placeSearch={"Search customer"}
        setSearch={setSearch}
        path="/register"
      />
      <Table name={search} id={id} />
    </div>
  );
}

export { CustomersSite, UpSearch };
