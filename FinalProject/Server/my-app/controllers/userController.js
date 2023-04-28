const User = require('../models/user');
const bcrypt = require('bcrypt');

//This is a function to get all users (limited to 15 to reduce browser load)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    .limit(15);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//This is a function to create a user (hashes the password)
exports.createUser = async (req, res) => {
  var password = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  req.body.password = hash;
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//This is a function to get a user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//This is a function to get a user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email : req.body.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//This is a function that updates the user's career and skills
exports.updateUserCareerAndSkills = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { career, skills } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.career = career;
    user.skills = skills;
    req.session.user = user;

    await user.save();

    res.status(200).json({ message: 'User career and skills updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//This is a function that searches for a user by name (regex is used to perform a case insensitive search)
exports.searchUserByUsername = async (req, res) => {
  try {
    const name = req.params.name;
    const users = await User.find({ name: { $regex: name, $options: 'i' } })
    .limit(15);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//This is a function that deletes a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



