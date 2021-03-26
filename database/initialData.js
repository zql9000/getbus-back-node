const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');
const DocumentType = require('../models/DocumentType');
const Person = require('../models/Person');

const initialData = async () => {
  // add roles
  let newRole = new Role({ name: 'Administrador' });
  const insertedRole1 = await newRole.save();
  newRole = new Role({ name: 'Supervisor' });
  const insertedRole2 = await newRole.save();
  newRole = new Role({ name: 'Vendedor' });
  const insertedRole3 = await newRole.save();

  // add documentTypes
  let newDocumentType = new DocumentType({
    name: 'Documento Nacional de Identidad',
    shortName: 'DNI',
  });
  const insertedDocumentType = await newDocumentType.save();
  newDocumentType = new DocumentType({
    name: 'Libreta Cívica',
    shortName: 'LC',
  });
  await newDocumentType.save();
  newDocumentType = new DocumentType({
    name: 'Libreta de Enrolamiento',
    shortName: 'LE',
  });
  await newDocumentType.save();
  newDocumentType = new DocumentType({
    name: 'Pasaporte',
    shortName: 'PAS',
  });
  await newDocumentType.save();

  // add persons
  const birthdate = new Date(1980, 0, 1);
  let newPerson = new Person({
    documentType: insertedDocumentType._id,
    documentNumber: '28.123.456',
    name: 'Administrador',
    lastName: 'Del Sistema',
    birthdate,
  });
  const insertedPerson1 = await newPerson.save();
  newPerson = new Person({
    documentType: insertedDocumentType._id,
    documentNumber: '28.123.456',
    name: 'Supervisor',
    lastName: 'Del Sistema',
    birthdate,
  });
  const insertedPerson2 = await newPerson.save();
  newPerson = new Person({
    documentType: insertedDocumentType._id,
    documentNumber: '28.123.456',
    name: 'Vendedor',
    lastName: 'Del Sistema',
    birthdate,
  });
  const insertedPerson3 = await newPerson.save();

  // add users
  const salt = bcrypt.genSaltSync();
  let newUser = new User({
    username: 'administrador',
    password: bcrypt.hashSync('administrador', salt),
    person: insertedPerson1._id,
    role: insertedRole1._id,
  });
  await newUser.save();
  newUser = new User({
    username: 'supervisor',
    password: bcrypt.hashSync('supervisor', salt),
    person: insertedPerson2._id,
    role: insertedRole2._id,
  });
  await newUser.save();
  newUser = new User({
    username: 'vendedor',
    password: bcrypt.hashSync('vendedor', salt),
    person: insertedPerson3._id,
    role: insertedRole3._id,
  });
  await newUser.save();
};

module.exports = { initialData };
