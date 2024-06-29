const errors = {
  error: { message: "Error", statusCode: 400 },
  auth: { message: "Bad auth", statusCode: 401 },
  forbidden: { message: "Forbiden", statusCode: 403 },
  notFound: { message: "Not Found", statusCode: 404 },
  fatal: { message: "Fatal", statusCode: 500 },
  invalidCredentials: { message: "Invalid Credentials", statusCode: 400 },
};

export default errors;
