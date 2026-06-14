import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// VEHICLES
// =========================

export const getVehicles = async () => {
  const response = await API.get("/vehicles/");
  return response.data;
};

export const createVehicle = async (data) => {
  const response = await API.post(
    "/vehicles/",
    data
  );

  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await API.delete(
    `/vehicles/${id}`
  );

  return response.data;
};

// =========================
// TRIPS
// =========================

export const getTrips = async () => {
  const response = await API.get("/trips/");
  return response.data;
};

export const createTrip = async (data) => {
  const response = await API.post(
    "/trips/",
    data
  );

  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await API.delete(
    `/trips/${id}`
  );

  return response.data;
};

// =========================
// ANALYTICS
// =========================

export const getAnalytics = async () => {
  const response = await API.get(
    "/analytics/"
  );

  return response.data;
};

// =========================
// SIMULATOR
// =========================

export const runSimulation = async (
  data
) => {
  const response = await API.post(
    "/simulate/",
    data
  );

  return response.data;
};

export const calculateRisk = async (
  data
) => {

  const response = await API.post(
    "/risk/",
    data
  );

  return response.data;
};

export const analyzeTrip = async (data) => {

  const response = await API.post(
    "/results/",
    data
  );

  return response.data;
};

// =========================
// PREDICTION
// =========================

export const predictRange = async (
  data
) => {
  const response = await API.post(
    "/predict/",
    data
  );

  return response.data;
};

// =========================
// WOLFRAM OPTIMIZATION
// =========================

export const optimizeTrip = async (
  data
) => {
  const response = await API.post(
    "/optimization/",
    data
  );

  return response.data;
};

export default API;

