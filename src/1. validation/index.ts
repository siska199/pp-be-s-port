export const messageError = {
  required: (name: string) => `${name} is Required`,
  invalid: (name: string) => `${name} is Invalid`,
  maxCharacter: (name: string, maxCharacter: number) =>
    `${name} must not exceed ${maxCharacter} characters.`,
  minCharacter: (name: string, maxCharacter: number) =>
    `${name} must have at least ${maxCharacter} characters.`,
  minNumber: (name: string, min: number) =>
    `${name} must be at least ${min} digits long.`,
  maxNumber: (name: string, max: number) =>
    `${name} must not exceed ${max} digits.`,
  password:
    "Password must be at least 8 characters long and contain at least one uppercase letter",
  url: "Please enter a valid URL. Ensure it starts with http:// or https://",
  dateUtc: "Date must be in UTC format (ISO 8601)",
};

const validation = {
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: messageError.invalid("Email"),
  },
  password: {
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message: messageError.password,
  },
  url: {
    regex: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
    message: messageError.url,
  },
  dateUtc: {
    regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    message: messageError.dateUtc,
  },
};

export default validation;
