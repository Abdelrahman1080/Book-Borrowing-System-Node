const db = require('../config/firebase');

exports.create = async (data) => {
  const ref = await db.collection('borrows').add(data);

  return { id: ref.id, ...data };
};

exports.findActiveByBook = async (bookId) => {
  const snap = await db.collection('borrows')
    .where('bookId', '==', bookId)
    .where('returnedAt', '==', null)
    .get();

  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
};

exports.findByUser = async (userId) => {
  const snap = await db.collection('borrows')
    .where('userId', '==', userId).get();


  return snap.docs.map(d => ({ id: d.id, ...d.data()  }));
};


exports.update = (id, data) =>
  db.collection('borrows').doc(id).update(data);