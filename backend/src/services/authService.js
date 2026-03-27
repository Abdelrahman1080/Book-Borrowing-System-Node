const userRepo = require('../repositories/userRepo');
const { hash, compare } = require('../utils/hash');
const { sign } = require('../utils/jwt');

exports.register = async ({ email, password }) => {
  if (await userRepo.findByEmail(email))
    throw new Error('User exists');

  const user = await userRepo.create({
    email,
    password: await hash(password)
  });

  return { token: sign({ id: user.id, email }) };
};
exports.getProfile = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error('Not found');

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error('Invalid');

  if (!(await compare(password, user.password)))
    throw new Error('Invalid');

  return { token: sign({ id: user.id, email }) };
};