import axios from "./axios";

export const assignOrderToDriver = async (orderId, driverId) => {
  const response = await axios.post(
    `/api/orders/${orderId}/assign`,
    { driverId }
  );

  return response.data;
};