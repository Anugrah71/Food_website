import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("Password"),
    location: Joi.string().required().label("location"),
    role: Joi.string()
      .valid("user", "admin", "super_admin")
      .optional()
      .label("role"),
  });
  return schema.validate(body);
};

const logInBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(body);
};

// const refreshTokenBodyValidation = (body) => {
//     const schema = Joi.object({
//         refreshToken: Joi.string().required().label("Refresh Token"),
//     });
//     return schema.validate(body);
// };

export {
  signUpBodyValidation,
  logInBodyValidation,
  // refreshTokenBodyValidation,
};
