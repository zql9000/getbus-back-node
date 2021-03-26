const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const User = require('../models/User');
const Role = require('../models/Role');
const DocumentType = require('../models/DocumentType');
const Person = require('../models/Person');

const login = async (req, res = response) => {
  const { username, password } = req.body;
  try {
    // if there are no users in the database, create first generic admin
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      createAdminUser();
    }

    const user = await User.findOne({ username })
      .populate('role', 'name')
      .populate('person', ['name', 'lastName']);

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: 'User or Password is incorrect' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, message: 'User or Password is incorrect' });
    }

    const token = generateToken(user.id, user.role.id);

    return res.json({
      ok: true,
      idUser: user._id,
      name: user.person.name,
      lastName: user.person.lastName,
      idRole: user.role._id,
      role: user.role.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const createAdminUser = async () => {
  // add role
  const newRole = new Role({ name: 'Administrador' });
  const insertedRole = await newRole.save();
  console.log('Role: ', insertedRole);

  // add documentType
  const newDocumentType = new DocumentType({
    name: 'Documento Nacional de Identidad',
    shortName: 'DNI',
  });
  const insertedDocumentType = await newDocumentType.save();

  // add person
  const birthdate = new Date(1980, 0, 1);
  const newPerson = new Person({
    documentType: insertedDocumentType._id,
    documentNumber: '28.123.456',
    name: 'Administrador',
    lastName: 'Del Sistema',
    birthdate,
  });
  const insertedPerson = await newPerson.save();

  // add user
  const salt = bcrypt.genSaltSync();
  const newUser = new User({
    username: 'admin',
    password: bcrypt.hashSync('admin123', salt),
    person: insertedPerson._id,
    role: insertedRole._id,
  });
  const insertedUser = await newUser.save();

  const test = await User.countDocuments();
  console.log(test);
};

const renewToken = (req, res = response) => {
  const { idUser, idRole } = req;

  const token = generateToken(idUser, idRole);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  login,
  renewToken,
};
