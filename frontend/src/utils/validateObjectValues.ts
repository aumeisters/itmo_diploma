import { isNullOrUndefined } from "./isNullOrUndefined";

export const validateObjectValues = (obj: object) => {
  return !Object.values(obj).some((val: any) => isNullOrUndefined(val) || val === '');
};
