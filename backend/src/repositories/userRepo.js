const db = require('../config/firebase');

exports.create = async (data) => {
  const ref = await db.collection('users').add(data);
  return { id: ref.id, ...data };
};

exports.findByEmail = async (email) => {
  const snap = await db.collection('users')
    .where('email', '==', email).get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
};