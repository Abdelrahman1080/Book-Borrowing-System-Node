const service = require('../services/bookService');

exports.create = async (req, res, next) => {
  try { res.json(await service.create(req.user.id, req.body)); }
  catch (e) { next(e); }
};

exports.myBooks = async (req, res, next) => {
  try { res.json(await service.myBooks(req.user.id)); }
  catch (e) { next(e); }
};

exports.archive = async (req, res, next) => {
  try {
    await service.toggleArchive(req.user.id, req.params.id, true);
    res.json({ message: 'archived' });
  } catch (e) { next(e); }
};
exports.getBook = async (req, res, next) => {
  try {
      const book = await service.getBook(req.params.id);
      res.json(book);
      
  } catch (e) { next(e); }
}

exports.browseBooks = async (req, res, next) => {
  try { res.json(await service.browseBooks()); }
  catch (e) { next(e); }
};

exports.unarchive = async (req, res, next) => {
  try {
    await service.toggleArchive(req.user.id, req.params.id, false);
    res.json({ message: 'unarchived' });
  } catch (e) { next(e); }
};