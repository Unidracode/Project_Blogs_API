const Joi = require('joi');

const displayNameSchema = Joi.string().min(8).required();

const emailSchema = Joi.string()
  .email({ minDomainSegments: 2 })
  .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .required();

const passwordSchema = Joi.string().min(6).required();

module.exports = {
    displayNameSchema,
    emailSchema,
    passwordSchema,
};
