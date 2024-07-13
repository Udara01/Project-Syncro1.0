// src/utils/hasPermission.js
import { permissions } from '../permissions';

export const hasPermission = (roles, component) => {
  for (let role of roles) {
    if (permissions[role] && permissions[role].includes(component)) {
      return true;
    }
  }
  return false;
};
