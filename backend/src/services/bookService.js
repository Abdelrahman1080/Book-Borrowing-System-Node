const bookRepo = require('../repositories/bookRepo');
const borrowRepo = require('../repositories/borrowRepo');


exports.create = (userId, data) =>
  bookRepo.create({
    ...data,
    ownerId: userId,
    isAvailable: true,
    isArchived: false,
    isBorrowed: false
  });

exports.myBooks = async (userId) => {
  const books = await bookRepo.findByOwner(userId);

  return Promise.all(books.map(async (b) => {
    const borrow = await borrowRepo.findActiveByBook(b.id);

    return {
      ...b,
      borrowedBy: borrow ? borrow.userId : null
    };
  }));
};

exports.getBook = async (bookId) => {
  const book = await bookRepo.findById(bookId);
  if (!book)    throw new Error('Not found');

  const borrow = await borrowRepo.findActiveByBook(bookId);

  return {
    ...book,
    borrowedBy: borrow ? borrow.userId : null
  };
};

exports.browseBooks = async () => {
  const books = await bookRepo.getAll();
  return Promise.all(books.map(async (b) => {
    const borrow = await borrowRepo.findActiveByBook(b.id);

    return {
      ...b,
      borrowedBy: borrow ? borrow.userId : null
    };
  }));
};

exports.toggleArchive = async (userId, bookId, value) => {
  const book = await bookRepo.findById(bookId);
  if (!book || book.ownerId !== userId)
    throw new Error('Forbidden');

  await bookRepo.update(bookId, {
    isArchived: value,
    isAvailable: value ? false : true
  });
};