const { generateOTP } = require('../services/OTP');
const { sendMail } = require('../services/MAIL');
const User = require('../models/User');

module.exports.signUpUser = async (req, res) => {
  const { name, email } = req.body;
  console.log(`Name: ${name} and Phone: ${email}`);
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }
  // create new user
  const newUser = await createUser(name, email);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.send(newUser);
};

module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (name, email) => {
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    name,
    email,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  try {
    let msg = await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    console.log('Message is ', msg);
    return [true, newUser, msg];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, 'User not found'];
  }
  if (user && user.otp !== otp) {
    return [false, 'Invalid OTP'];
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};

//LOGOUT
module.exports.logoutUser = async (req, res) => {
  const { email2 } = req.body;

  const user2 = await validateLogout(email2);
  res.send(user2);
};

const validateLogout = async (email2) => {
  const user_logout = await User.findOne({
    email2,
  });

  const updateUser = await User.findByIdAndUpdate(user_logout._id, {
    $set: { active: false },
  });

  return [true, updateUser];
};

//SIGNIN
module.exports.signInUser = async (req, res) => {
  const { email3 } = req.body;

  const isExisting2 = await User.findOne({
    email3,
  });

  if (!isExisting2) {
    return res.send([false, 'User Does not Exist']);
  }

  const otpGenerated2 = generateOTP();

  const updateUser2 = await User.findByIdAndUpdate(isExisting2._id, {
    $set: { otp: otpGenerated2, active: false },
  });

  res.send([true, updateUser2]);
};
