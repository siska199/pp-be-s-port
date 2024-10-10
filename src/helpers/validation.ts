import { TGeneralObject } from "@types";

export const validateMandatoryFields = (fields: TGeneralObject) => {
  const errors: TGeneralObject = {};

  const formatFieldName = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  Object.entries(fields).forEach(([key, value]) => {
    if (!value) {
      errors[key] = `${formatFieldName(key)} is mandatory`;
    }
  });

  return errors;
};
