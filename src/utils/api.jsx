/* eslint-disable camelcase */
import fakeAuth from "./fakeAuth";

const LOCAL_STORAGE_AUTHUSER = import.meta.env.VITE_LOCAL_STORAGE_AUTHUSER;
const BASE_URL_TEST = import.meta.env.VITE_BASE_URL_TEST;
const HISTORY_TEST = import.meta.env.VITE_HISTORY_TEST;

const api = (() => {
  const putAccessUser = (user) => {
    return localStorage.setItem(LOCAL_STORAGE_AUTHUSER, user);
  };

  const getAccessUser = () => {
    return localStorage.getItem(LOCAL_STORAGE_AUTHUSER);
  };

  const login = async (user) => {
    const response = await fakeAuth(user);
    const { status, message, data } = await JSON.parse(response);
    if (status !== "success") {
      throw new Error(message);
    }
    return data;
  };

  const generateQuestions = async (id) => {
    const response = await fetch(
      `${BASE_URL_TEST}amount=10&category=${id}&difficulty=easy&type=multiple`
    );
    const { response_code, results } = await response.json();

    if (response_code !== 0) {
      throw new Error("Internal server error!");
    }

    return results;
  };

  const setHistoryTest = (data) => {
    return localStorage.setItem(HISTORY_TEST, JSON.stringify(data));
  };

  const getHistoryTest = () => {
    const histories = localStorage.getItem(HISTORY_TEST);
    if (!histories) {
      setHistoryTest([]);
    }
    return JSON.parse(histories);
  };

  const addhistoryTests = (data) => {
    const histories = getHistoryTest();
    histories.push(data);
    return setHistoryTest(histories);
  };

  const getDetailHistoryById = (id) => {
    const histories = getHistoryTest();
    const findDetailById = histories.find((history) => history.id === id);
    return findDetailById;
  };

  return {
    putAccessUser,
    getAccessUser,
    login,
    generateQuestions,
    getHistoryTest,
    addhistoryTests,
    getDetailHistoryById,
  };
})();

export default api;
