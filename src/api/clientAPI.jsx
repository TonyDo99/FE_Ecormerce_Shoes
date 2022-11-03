const axios = require("axios").default;
// const host = "https://be-shoes-web.herokuapp.com";
export const host = "http://localhost:3001/api";

export const fetchCart = async () => {
  try {
    let { data } = await axios.get(`${host}/home`);
    localStorage.setItem("cart", JSON.stringify(data?.cart || []));
    return data.infor;
  } catch (error) {
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error" ${error}`,
      "color: red"
    );
  }
};

export const fetchProducts = async () => {
  try {
    let { data } = await axios.get(`${host}/categories`);
    return data;
  } catch (error) {
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error"  ${error}`,
      "color: red"
    );
  }
};

export const fetchDetailProducts = async (_id) => {
  try {
    let { data } = await axios.get(`${host}/categories/${_id}`);
    return data;
  } catch (error) {
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error" ${error}`,
      "color: red"
    );
  }
};

export const postProduct = async (detailProducts, setSoldOut) => {
  try {
    let localCart = JSON.parse(localStorage.getItem("cart"));
    localCart.push(detailProducts);
    localStorage.setItem("cart", JSON.stringify(localCart));
    let { data } = await axios.post(`${host}/categories/${detailProducts._id}`);
    if (data.status !== 400) {
      setSoldOut(false);
      localCart.unshift(detailProducts);
    } else setSoldOut(true);
  } catch (err) {
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error" ${err}`,
      "color: red"
    );
  }
};

export const removeItem = async (index, items, items_id) => {
  items.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(items));
  await axios.post(`${host}/categories/${items_id}?_method=PUT`, items);
};

export const getBrands = async () => {
  try {
    let { data } = await axios.get(`${host}/brands`);
    return data;
  } catch (error) {
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error" ${error}`,
      "color: red"
    );
  }
};

export const sendFeedBack = async (email, message) => {
  try {
    let { data } = await axios.post(`${host}/sendMail/feedback`, {
      client: email,
      content: message,
    });
    return data;
  } catch (error) {
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error" ${error}`,
      "color: red"
    );
  }
};

export const applyCoupon = async (code, setResponse, setShowModal) => {
  try {
    let { data } = await axios.post(`${host}/coupon/apply`, {
      code,
    });
    return setResponse(data);
  } catch (error) {
    setShowModal(true);
    setResponse(error.response.data);
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error" ${error}`,
      "color: red"
    );
  }
};

export const payment = async ({ totalHasVoucher }, total_price, setPaid) => {
  try {
    if (total_price === 0) throw new Error("Cart of customer is empty !");

    let { data } = await axios.post(`${host}/payment`, {
      totalHasVoucher: totalHasVoucher ?? total_price,
    });
    setPaid(data);
  } catch (error) {
    setPaid({
      status: false,
      message: error,
    });
    console.log(
      `%c "🚀 ~ file: clientAPI.jsx ~ line 82 ~ applyCoupon ~ error" ${error}`,
      "color: red"
    );
  }
};
