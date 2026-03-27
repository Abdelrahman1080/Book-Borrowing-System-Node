const db = require('../config/firebase');

exports.create = async (data) => {
  const ref = await db.collection('books').add(data);
  return { id: ref.id, ...data };
};

exports.findById = async (id) => {
  const doc = await db.collection('books').doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

exports.update = (id, data) =>
  db.collection('books').doc(id).update(data);

exports.findByOwner = async (ownerId) => {
  const snap = await db.collection('books')
    .where('ownerId', '==', ownerId).get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

exports.getAll = async () => {
  const snap = await db.collection('books').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};