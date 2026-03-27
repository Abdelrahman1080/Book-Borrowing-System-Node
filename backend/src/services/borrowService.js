const borrowRepo = require('../repositories/borrowRepo');
const bookRepo = require('../repositories/bookRepo');

exports.borrow = async (userId, bookId) => {
  const book = await bookRepo.findById(bookId);

  if (!book) throw new Error('Not found');

  if (book.isArchived)
    throw new Error('Archived book');

  if (!book.isAvailable)
    throw new Error('Already borrowed');

  if (book.ownerId === userId)
    throw new Error("Can't borrow own book");

  if(book.isBorrowed) throw new Error('Book is already borrowed');

  await bookRepo.update(bookId, { isAvailable: false, isBorrowed: true });

  return borrowRepo.create({
    userId,
    bookId,
    borrowedAt: new Date(),
    returnedAt: null
  });
};

exports.returnBook = async (userId, bookId) => {
  const borrow = await borrowRepo.findActiveByBook(bookId);

  if (!borrow || borrow.userId !== userId)
    throw new Error('Not allowed');

  await borrowRepo.update(borrow.id, {
    returnedAt: new Date()
  });

  await bookRepo.update(bookId, { isAvailable: true , isBorrowed: false });
};

exports.myBorrows = (userId) =>
  borrowRepo.findByUser(userId);