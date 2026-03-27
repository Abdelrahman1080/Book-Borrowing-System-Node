const router = require('express').Router();
const auth = require('../middlewares/auth');

const authC = require('../controllers/authController');
const bookC = require('../controllers/bookController');
const borrowC = require('../controllers/borrowController');

router.post('/register', authC.register);
router.post('/login', authC.login);
router.get('/profile', auth, authC.getProfile);

router.post('/books', auth, bookC.create);
router.get('/books/me', auth, bookC.myBooks);
router.get('/books', auth, bookC.browseBooks);
router.get('/books/:id', auth, bookC.getBook);
router.patch('/books/:id/archive', auth, bookC.archive);
router.patch('/books/:id/unarchive', auth, bookC.unarchive);

router.post('/borrow/:bookId', auth, borrowC.borrow);
router.post('/return/:bookId', auth, borrowC.returnBook);
router.get('/borrows/me', auth, borrowC.myBorrows);

module.exports = router;