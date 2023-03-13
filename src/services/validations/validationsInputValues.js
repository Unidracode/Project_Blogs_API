const { displayNameSchema, emailSchema, passwordSchema } = require('./schemas');

const validateNewUser = ({ displayName, email, password }) => {
    const validateDisplayName = displayNameSchema.validate(displayName);
    if (validateDisplayName.error) {
        throw new Error('"displayName" length must be at least 8 characters long');
    }
    const validateEmail = emailSchema.validate(email);
    if (validateEmail.error) {
        throw new Error('"email" must be a valid email');
    }
    const validatePassword = passwordSchema.validate(password);
    if (validatePassword.error) {
        throw new Error('"password" length must be at least 6 characters long');
    }
};

module.exports = {
    validateNewUser,
};
