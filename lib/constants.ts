export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])^(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

export const PASSWORD_REGEX_ERROR =
  "A password must have lowercase, uppercase, a number and special characters";

export const USERNAME_REGEX = new RegExp(/^[a-z0-9]+$/);

export const USERNAME_REGEX_ERROR =
  "A password must have no special characters";
