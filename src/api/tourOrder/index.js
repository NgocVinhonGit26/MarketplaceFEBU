import instance from "api/axios";

const getAllTourOrders = async (page, queryCondition = {}, token) => {
  let url = `/admin/getListOrderTour/${page}?`;
  console.log("page >>>>>>> aka: ", page)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  if (queryCondition.status) {
    url += `&status=${queryCondition.status}`;
  }

  if (queryCondition.userName) {
    url += `&userName=${queryCondition.userName}`;
  }

  if (queryCondition.tourName) {
    url += `&tourName=${queryCondition.tourName}`;
  }

  if (queryCondition.startTimeFrom) {
    url += `&startTimeFrom=${queryCondition.startTimeFrom}`;
  }

  if (queryCondition.startTimeTo) {
    url += `&startTimeTo=${queryCondition.startTimeTo}`;
  }

  if (queryCondition.priceFrom) {
    url += `&priceFrom=${queryCondition.priceFrom}`;
  }

  if (queryCondition.priceTo) {
    url += `&priceTo=${queryCondition.priceTo}`;
  }

  if (queryCondition.createdAtFrom) {
    url += `&createdAtFrom=${queryCondition.createdAtFrom}`;
  }

  if (queryCondition.createdAtTo) {
    url += `&createdAtTo=${queryCondition.createdAtTo}`;
  }

  // console.log("url >>>>>>> aka: ", url)
  try {
    const response = await instance.get(url, config);
    // console.log("response >>>>>>> aka: ", response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTotalPageOrderTour = async (page, queryCondition = {}, token) => {
  let url = `/admin/getTotalPageOrderTour/${page}?`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  if (queryCondition.status) {
    url += `&status=${queryCondition.status}`;
  }

  if (queryCondition.userName) {
    url += `&userName=${queryCondition.userName}`;
  }

  if (queryCondition.tourName) {
    url += `&tourName=${queryCondition.tourName}`;
  }

  if (queryCondition.startTimeFrom) {
    url += `&startTimeFrom=${queryCondition.startTimeFrom}`;
  }

  if (queryCondition.startTimeTo) {
    url += `&startTimeTo=${queryCondition.startTimeTo}`;
  }

  if (queryCondition.priceFrom) {
    url += `&priceFrom=${queryCondition.priceFrom}`;
  }

  if (queryCondition.priceTo) {
    url += `&priceTo=${queryCondition.priceTo}`;
  }

  if (queryCondition.createdAtFrom) {
    url += `&createdAtFrom=${queryCondition.createdAtFrom}`;
  }

  if (queryCondition.createdAtTo) {
    url += `&createdAtTo=${queryCondition.createdAtTo}`;
  }

  // console.log("url >>>>>>> aka: ", url)
  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const orderTour = async (data, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await instance.post("/tour/insertOrder", data, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const updateTourOrder = async (tourOrderId, tourOrderData) => {
  let url = `/tour-orders/${tourOrderId}`;
  try {
    const response = await instance.put(url, tourOrderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changeStatus = async (tourOrderId, data, token) => {
  let url = `/admin/updateStatusOrderById/${tourOrderId}`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.post(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

const getQuantityOrderTourCompleteInToday = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteInToday`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCancelInToday = async (token) => {
  let url = `/admin/getQuantityOrderTourCancelInToday`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCompleteInThisWeek = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteInThisWeek`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCancelInThisWeek = async (token) => {
  let url = `/admin/getQuantityOrderTourCancelInThisWeek`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCompleteInThisMonth = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteInThisMonth`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCancelInThisMonth = async (token) => {
  let url = `/admin/getQuantityOrderTourCancelInThisMonth`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCompleteInThisYear = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteInThisYear`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCancelInThisYear = async (token) => {
  let url = `/admin/getQuantityOrderTourCancelInThisYear`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCompleteTodayByTimePeriod = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteTodayByTimePeriod`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCompleteThisWeekByDayOfWeek = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteThisWeekByDayOfWeek`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCompleteThisMonthByWeekOfMonth = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteThisMonthByWeekOfMonth`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await instance.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

const getQuantityOrderTourCompleteThisYearByQuarter = async (token) => {
  let url = `/admin/getQuantityOrderTourCompleteThisYearByQuarter`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  }
  catch (error) {
    throw error;
  }
}

const getTop5TourHighestPriceInToday = async (token) => {
  let url = `/admin/getTop5TourHighestPriceInToday`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  }
  catch (error) {
    throw error;
  }
}

const getTop5TourHighestPriceInThisWeek = async (token) => {
  let url = `/admin/getTop5TourHighestPriceInThisWeek`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  }
  catch (error) {
    throw error;
  }
}

const getTop5TourHighestPriceInThisMonth = async (token) => {
  let url = `/admin/getTop5TourHighestPriceInThisMonth`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  }
  catch (error) {
    throw error;
  }
}

const getTop5TourHighestPriceInThisYear = async (token) => {
  let url = `/admin/getTop5TourHighestPriceInThisYear`;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config);
    return response;
  }
  catch (error) {
    throw error;
  }
}



export {
  getAllTourOrders,
  updateTourOrder,
  changeStatus,
  getTotalPageOrderTour,
  orderTour,
  getQuantityOrderTourCompleteInToday,
  getQuantityOrderTourCancelInToday,
  getQuantityOrderTourCompleteInThisWeek,
  getQuantityOrderTourCancelInThisWeek,
  getQuantityOrderTourCompleteInThisMonth,
  getQuantityOrderTourCancelInThisMonth,
  getQuantityOrderTourCompleteInThisYear,
  getQuantityOrderTourCancelInThisYear,
  getQuantityOrderTourCompleteTodayByTimePeriod,
  getQuantityOrderTourCompleteThisWeekByDayOfWeek,
  getQuantityOrderTourCompleteThisMonthByWeekOfMonth,
  getQuantityOrderTourCompleteThisYearByQuarter,
  getTop5TourHighestPriceInToday,
  getTop5TourHighestPriceInThisWeek,
  getTop5TourHighestPriceInThisMonth,
  getTop5TourHighestPriceInThisYear
};
