const service = require('../services/authService');

exports.register = async (req, res, next) => {
  try { res.json(await service.register(req.body)); }
  catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try { res.json(await service.login(req.body)); }
  catch (e) { next(e); }
};

exports.getProfile = async (req, res, next) => {
  try { res.json(await service.getProfile(req.user.id)); }
  catch (e) { next(e); }
};