export const axios = require("axios").default;
// const host = "https://be-shoes-web.herokuapp.com";
export const host = "http://localhost:3001/api";
export const fetchUser = async () => {
  try {
    const { data } = await axios.get(`${host}/dashboard/account`);
    return data;
  } catch (err) {
    console.log(`%c ${err}`, "color: red");
  }
};

export const fetchProductsAdmin = async () => {
  try {
    const { data } = await axios.get(`${host}/dashboard/products`);
    return data;
  } catch (err) {
    console.log(`%c ${err}`, "color: red");
  }
};

export const fetchCustomers = async () => {
  try {
    const { data } = await axios.get(`${host}/dashboard/customers`);
    return data?.customersList;
  } catch (err) {
    console.log(`%c ${err}`, "color: red");
  }
};

export const uploadProduct = async (formData) => {
  try {
    const { data } = await axios.post(`${host}/admin/updateProfile`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log(`%c ${error}`, "color: red");
  }
};

// Coupon API
/**
 * @param { FormData } formData - FormData object
 * @return { PromiseLike<Object> } { status, message } - Response from BE
 */

export const createCoupon = async (formData) => {
  try {
    const { data } = await axios.post(`${host}/admin/coupon/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log(`%c ${error}`, "color: red");
  }
};

/**
 * @return { Promise<Object> } - { status, message, coupons: {} }
 */

export const getCoupon = async () => {
  try {
    let { data } = await axios.get(`${host}/admin/coupon/all`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, "color: red");
  }
};

/**
 * @type { number }
 * @param { code }
 *
 * @type {  }
 * @returns { }
 */

export const getDetailCoupon = async (code) => {
  try {
    let { data } = await axios.get(`${host}/admin/coupon/${code}`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, "color: red");
  }
};

/**
 * @param { FormData }
 * @returns { Promise<{}> }
 */

export const updateCoupon = async (formData, code) => {
  try {
    let { data } = await axios.patch(`${host}/admin/coupon/${code}`, formData);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, "color: red");
  }
};

/**
 * @param { code }
 * @type { number }
 */

export const deleteCoupon = async (code, setShowModal) => {
  try {
    let { data } = await axios.delete(`${host}/admin/coupon/${code}`);
    if (data.status) setShowModal(true);
    else setShowModal(false);
  } catch (error) {
    setShowModal(false);
    console.log(`%c ${error}`, "color: red");
  }
};

/**
 * @param {*} idProducts
 * @type { string }
 */

export const getDetailProduct = async (idProducts) => {
  try {
    let { data } = await axios.get(`${host}/categories/${idProducts}`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, "color: red");
  }
};

/**
 * @param {idProducts, _id, setShowModal}
 * @type {FormData, string, function}
 */

export const updateProduct = async (formData, _id, setShowModal) => {
  try {
    let { data } = await axios.patch(
      `${host}/admin/updateProduct/${_id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (data.status) setShowModal(true);
    else setShowModal(false);
  } catch (error) {
    setShowModal(false);
    console.log(`%c ${error}`, "color: red");
  }
};
