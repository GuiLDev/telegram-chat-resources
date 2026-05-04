 import {userStates} from "../data/userStates.js";

export function setUserState(chatId, action) {
  userStates[chatId] = {
    action,
  };
}

export function getUserState(chatId) {
  return userStates[chatId];
}

export function cancelOperation(chatId) {
  delete userStates[chatId];
}