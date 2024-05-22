import {
  SET_TODO_INPUT,
  CHOOSE_DETAIL_USER,
  SHOW_ALL_USER,
  IS_LOGIN,
  IS_ALERT,
  SHOW_MESSAGE_ALERT,
  IS_SHOW_SIDEBAR,
  CHECKED_ACC,
} from "./Constant";
export const setTodoInput = (payload) => ({
  type: SET_TODO_INPUT,
  payload,
});
export const chooseDetailUser = (payload) => ({
  type: CHOOSE_DETAIL_USER,
  payload,
});
export const showAllUser = (payload) => ({
  type: SHOW_ALL_USER,
  payload,
});
export const isLogin = (payload) => ({
  type: IS_LOGIN,
  payload,
});
export const isAlert = (payload) => ({
  type: IS_ALERT,
  payload,
});
export const showMessageAlert = (payload) => ({
  type: SHOW_MESSAGE_ALERT,
  payload,
});
export const isShowSidebar = (payload) => ({
  type: IS_SHOW_SIDEBAR,
  payload,
});
export const checkedAcc = (payload) => ({
  type: CHECKED_ACC,
  payload,
});
