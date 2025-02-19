const Messages = {
  //common
  serverError: "An Error Occurred",
  badRequest: "Bad Request",
  forbidden: "Forbidden",

  requestSuccessful: "Request successful",
  requestFailed: "Request failed! Try again",
  updateSuccess: "Update successful",
  updateFailed: "Update failed! Try again",

  //auth
  invalidToken: "Invalid Access Token",
  invalidRefreshToken: "Invalid Refresh Token",
  tokenRefreshed: "Access Token Refreshed",
  tokenRefreshFailed: "Access Token Refresh Failed",
  tokenExpired: "Access Token Expired",
  refreshTokenExpired: "Refresh Token Expired",
  ApiKeyValidationError: "Authentication failed. Invalid API key.",

  invalidUsername: "Invalid username",
  invalidEmail: "Invalid email",
  invalidPhoneNumber:
    "Phone number must start with 2547 or 2541 followed by 8 digits",
  invalidPassword: "Invalid password",
  passwordRegex:
    "Password must be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and can contain special characters",
  invalidCredentials: "Invalid credentials",
  userCreatedSuccessfully: "User created successfully",
  errorCreatingUser: "Error creating user! Try again",
  loginSuccess: "Login successful",
  loginFailed: "Login failed",
  logOutSuccess: "Logged out successfully",
  logOutFailed: "Logout failed",
  passwordResetSuccessful: "Password reset successful",
  passwordResetFailed: "Password reset failed. Try again",
  passwordResetEmail: "Psasword reset email sent",
  passwordResetFailed: "Password reset failed",
  passwordResetSuccess: "Password reset successful",

  userNotFound: "User Not Found",
  userExists: "Credentials already in use",

  invalidAmount: "Invalid Amount",

  minWithdrawal: "Minimum Withdrawal is",
  maxWithdrawal: "Maximum Withdrawal is",
  withdrawalFailed: "Withdrawal Failed",
  withdrawalSuccess: "Withdrawal Successful",

  minDeposit: "Minimum Deposit is",
  maxDeposit: "Maximum Deposit is",
  depositFailed: "Deposit Failed",
  depositSuccess: "Deposit Successful",
  stkPushSent: "STK push sent.Input pin to complete transaction",
  stkPushFailed: "STK push failed",

  transactionInitiated:
    "M-PESA STK push sent.Input pin to complete transaction",
  transactionSuccess: "Transaction successful",
  transactionFailed: "Transaction failed. Try again",

  appCreateSuccess: "App created successfully",
  appCreateFail: "Failed to create app. Try again!",
  appNameRequired: "App Name is required",
  C2BCallbackURLRequired: "C2B Callback URL is required",
  AccountNumberRequired: "Account Number is required",
  AccountTypeRequired: "Account Type is required",
  InvalidAccountNumber: "Invalid Account Number",
  InvalidAccountType: "Invalid Account Type",
  invalidC2BCallbackURL: "C2B callback URL must be a valid https URL",
  appExists: "App already exists",
  appNotFound: "App not found",
  appUpdateSuccess: "App details updated successfully",
  appUpdateFail: "Failed to update app details. Try again!",
  appDeleteSuccess: "App deleted successfully",
  appDeleteFail: "Failed to delete app. Try again!",
};

module.exports = Messages;
