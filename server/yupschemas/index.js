const yup = require("yup");
const { Messages, walletConfig } = require("../config");

const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
const phoneRegexp = /^(2547|2541)\d{8}$/;

const C2BCallbackURLRegexp = /^(http|https):\/\/[^ "]+$/;
const regSchema = yup.object().shape({
  email: yup
    .string(Messages.invalidString)
    .email(Messages.invalidEmail)
    .required(Messages.emailRequired),
  password: yup
    .string(Messages.invalidString)
    .matches(passwordRegexp, Messages.passwordRegex)
    .required(Messages.passwordRequired),
});

const loginSchema = yup.object().shape({
  email: yup
    .string(Messages.invalidString)
    .email(Messages.invalidEmail)
    .required(Messages.emailRequired),
  password: yup
    .string(Messages.invalidString)
    .required(Messages.passwordRequired),
});

const googleOAuthSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  photoURL: yup.string().nullable(),
  phoneNumber: yup.string().nullable(),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string(Messages.invalidString)
    .email(Messages.invalidEmail)
    .required(Messages.emailRequired),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string(Messages.invalidString)
    .matches(passwordRegexp, Messages.passwordRegex)
    .required(Messages.passwordRequired),
});

const createAppSchema = yup.object().shape({
  Name: yup.string(Messages.invalidString).required(Messages.appNameRequired),
  C2BCallbackURL: yup
    .string(Messages.invalidString)
    .matches(C2BCallbackURLRegexp, Messages.invalidC2BCallbackURL)
    .required(Messages.C2BCallbackURLRequired),
  AccountNumber: yup
    .number(Messages.InvalidAccountNumber)
    .required(Messages.AccountNumberRequired),
  AccountType: yup
    .string(Messages.InvalidAccountType)
    .required(Messages.AccountTypeRequired),
});

const initiateC2BB2CSchema = yup.object().shape({
  // AppId: yup.string(Messages.invalidString).required(),
  Amount: yup
    .number()
    .lessThan(walletConfig.maxDeposit)
    .moreThan(walletConfig.minDeposit)
    .required(),
  PhoneNumber: yup
    .string(Messages.invalidPhoneNumber)
    .matches(phoneRegexp, Messages.invalidPhoneNumber)
    .required(),
});

const initiateB2BSchema = yup.object().shape({
  AppId: yup.string(Messages.invalidString).required(),
  Amount: yup
    .number()
    .lessThan(walletConfig.maxDeposit)
    .moreThan(walletConfig.minDeposit)
    .required(),
  PartyB: yup.string().required(),
  AccountReference: yup.string().required(),
  AccountType: yup
    .string()
    .matches(/Paybill|TillNumber/)
    .required(),
});

module.exports = {
  regSchema,
  loginSchema,
  googleOAuthSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  createAppSchema,
  initiateC2BB2CSchema,
  initiateB2BSchema,
};
