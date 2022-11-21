import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { storage } from "../../firebase/initializeApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { UpSearch } from "./Customers";
import { Pagination } from "../client/Categories";

import {
  fetchProductsAdmin,
  getDetailProduct,
  host,
  updateProduct,
} from "../../api/adminAPI";
import { Hypnosis } from "react-cssfx-loading";

import newIcon from "../../img/new.png";
import popularIcon from "../../img/popular.png";
import saleIcon from "../../img/sale.png";
import { FormProduct } from "../../components/form/ProductForm";
import { Link } from "react-router-dom";
import { ModalPayment } from "../../components/Modal";

const axios = require("axios").default;

function ListProducts({ name }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  useEffect(() => {
    fetchProductsAdmin()
      .then((items) => {
        setProducts(items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(`%c ${err}`, "color: red");
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-[15%]">
          <Hypnosis duration="4s" width="70px" height="70px" />
        </div>
      ) : (
        <>
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
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold text-gray_7a82a6 tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold text-indigo-500 text-opacity-90 tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="font-semibold sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentPosts
                        .filter((item) =>
                          item
                            ? item.name
                                .toLowerCase()
                                .includes(name.toLowerCase())
                            : name === ""
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={item.path}
                                    alt="shoes-img"
                                  />
                                </div>
                                <div className="ml-4">
                                  <span className="text-sm text-gray_7a82a6">
                                    {item.name}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray_7a82a6">
                                {item.quantity}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {item.price}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray_7a82a6">
                              {item.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/dashboard/product/${item._id}`}
                                className="text-indigo-600 hover:text-indigo-900 font-semibold"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="grid place-items-center w-full">
            <Pagination
              products={products}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              path={"dashboard/products"}
            />
          </div>
        </>
      )}
    </>
  );
}

function ProductsSite() {
  let [search, setSearch] = useState("");
  return (
    <div className="pt-10 px-8 mx-auto w-full">
      <UpSearch
        headTitle={"Products"}
        upTitle={"Add Product"}
        placeSearch={"Search product"}
        setSearch={setSearch}
        path="/dashboard/product/insert"
      />
      <ListProducts name={search} />
    </div>
  );
}

function InsertProduct() {
  let [select, setSelect] = useState(false);
  let [loading, setLoading] = useState(false);
  let ls_status = [
    { path: popularIcon, status: "Popular" },
    { path: newIcon, status: "New" },
    { path: saleIcon, status: "Sale" },
  ];
  const initialValues = {
    name: "",
    status: ls_status[0].status,
    path: "",
    price: 0,
    quantity: 0,
    src: ls_status[0].path,
  };

  let validationSchema = Yup.object().shape({
    name: Yup.string().required("Can't missing product name *"),
    status: Yup.string(),
    price: Yup.number(),
    path: Yup.mixed().required("Please select your product image *"),
    quantity: Yup.number(),
    src: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues,

    // POST HTTP lên cho server;
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      try {
        // Upload avatar to firebase storage
        const storageRef = ref(storage, `${values.path.name}`);
        await uploadBytes(storageRef, values.path).then(() => {
          console.log("Upload image success !");
        });

        let url_path = await getDownloadURL(ref(storage, values.path.name));
        formData.append("path", url_path);
        formData.append("name", values.name);
        formData.append("status", values.status);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);

        await axios.post(`${host}/admin/insertProducts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // if (data.success) {
        //   // setShowModal(data.success);
        // }
        setLoading(false);
      } catch (err) {
        console.log(`%c ${err}`, "color: red");
      }
    },
    validationSchema,
  });

  // Change select status in formdata
  const selected = (formik, item) => {
    formik.values.status = item.status;
    formik.values.src = item.path;
    setSelect(!select);
  };

  return (
    <div className="max-w-6xl pt-16 mx-auto">
      <p className="font-bold ml-5 text-3xl lg:ml-0"> New product</p>
      <form onSubmit={formik.handleSubmit}>
        {/* Left */}

        <FormProduct
          formik={formik}
          loading={loading}
          ls_status={ls_status}
          selected={selected}
          select={select}
          setSelect={setSelect}
        />
      </form>
    </div>
  );
}

function UpdateProduct({ _id }) {
  let [select, setSelect] = useState(false);
  let [loading, setLoading] = useState(false);
  let [detailProduct, setDetailProduct] = useState({});
  let [showModal, setShowModal] = useState(undefined);
  useEffect(() => {
    (async () => {
      setDetailProduct(await getDetailProduct(_id));
    })();
  }, [_id]);

  let ls_status = [
    { path: popularIcon, status: "Popular" },
    { path: newIcon, status: "New" },
    { path: saleIcon, status: "Sale" },
  ];

  let validationSchema = Yup.object().shape({
    name: Yup.string().required("Name can't be blank *"),
    status: Yup.string(),
    price: Yup.number(),
    path: Yup.mixed().required("Product image can't be blank *"),
    quantity: Yup.number(),
    src: Yup.mixed(),
  });
  const formik = useFormik({
    initialValues: {
      name: detailProduct?.name || "",
      status: detailProduct?.status || ls_status[0].status,
      path: detailProduct?.path || "",
      price: detailProduct?.price || 0,
      quantity: detailProduct?.quantity || 0,
      src:
        ls_status.find((e) => Object.values(e)[1] === detailProduct?.status)
          ?.path || ls_status[0].path,
    },

    // POST HTTP lên cho server;
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      try {
        // Upload avatar to firebase storage
        if (values.path.name) {
          const storageRef = ref(storage, `${values.path.name}`);
          await uploadBytes(storageRef, values.path);
          let url_path = await getDownloadURL(ref(storage, values.path.name));
          formData.append("path", url_path);
        } else {
          formData.append("path", values.path);
        }
        formData.append("name", values.name);
        formData.append("status", values.status);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);
        await updateProduct(formData, _id, setShowModal);
        setLoading(false);
      } catch (err) {
        console.log(`%c ${err}`, "color: red");
      }
    },
    validationSchema,
    enableReinitialize: true,
  });

  // Change select status in formdata
  const selected = (formik, item) => {
    console.log(item.status);
    formik.values.status = item.status;
    formik.values.src = item.path;
    setSelect(!select);
  };
  return (
    <div className="max-w-6xl pt-16 mx-auto">
      <p className="font-bold ml-5 text-3xl lg:ml-0"> Update product</p>
      <form onSubmit={formik.handleSubmit}>
        {/* Left */}

        <FormProduct
          formik={formik}
          loading={loading}
          ls_status={ls_status}
          selected={selected}
          select={select}
          setSelect={setSelect}
        />
      </form>
      {showModal !== undefined && <ModalPayment status={showModal} />}
    </div>
  );
}

export { ProductsSite, InsertProduct, UpdateProduct };
