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

export const createCoupon = async (formData) => {
  const { data } = await axios.post(`${host}/admin/coupon/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
