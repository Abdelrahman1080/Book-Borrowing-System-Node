const service = require('../services/borrowService');

exports.borrow = async (req, res, next) => {
  try {
    res.json(await service.borrow(req.user.id, req.params.bookId));
  } catch (e) { next(e); }
};

exports.returnBook = async (req, res, next) => {
  try {
    await service.returnBook(req.user.id, req.params.bookId);
    res.json({ message: 'returned' });
  } catch (e) { next(e); }
};

exports.myBorrows = async (req, res, next) => {
  try {
    res.json(await service.myBorrows(req.user.id));
  } catch (e) { next(e); }
};