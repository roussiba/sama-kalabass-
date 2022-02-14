const createTokenUser = (user) => {
  return { login: user.login, userId: user._id, compte_type: user.compte_type };
};

module.exports = createTokenUser;
