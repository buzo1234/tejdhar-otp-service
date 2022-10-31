const { generateOTP } = require('../services/OTP');
const { sendMail } = require('../services/MAIL');
const Insta = require('instamojo-nodejs');
const User = require('../models/User');
const url = require('url');

module.exports.allOrders = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user_all_orders = await findUserByEmail(email);
    const all_orders = user_all_orders.orders;
    res.send([true, all_orders]);
  } catch (error) {
    res.send([false, error]);
  }
};

module.exports.showOrders = async (req, res) => {
  let url_parts = url.parse(req.url, true),
    responsedata = url_parts.query;

  if (responsedata.payment_id) {
    let userId = responsedata.user_id;
    let user_order = await findUserByEmail(userId);

    await User.findByIdAndUpdate(user_order._id, {
      $push: {
        orders: user_order.cart,
      },
      $set: {
        cart: [],
      },
    });

    res.redirect('https://tejdharart.com/orders');
  } else {
    res.send([false, 'Payment not found']);
  }
};

module.exports.addToCart = async (req, res) => {
  const { userID, cart } = req.body;
  try {
    const user_cart = await findUserByEmail(userID);
    await User.findByIdAndUpdate(user_cart._id, {
      $set: { cart: cart },
    });
    console.log('done');
    res.send([true, 'Done']);
  } catch (error) {
    res.send([false, 'Error Occured']);
  }
};

module.exports.payInsta = async (req, res) => {
  Insta.setKeys(
    process.env.API || 'test_a4e7c88af7be7caeda3872fccd9',
    process.env.AUTH || 'test_16bd4fb836979bf83814bc01e2f'
  );
  const data = new Insta.PaymentData();

  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.buyer_name = req.body.buyer_name;
  data.redirect_url = req.body.redirect_url;
  data.phone = req.body.phone;
  data.send_sms = true;
  data.allow_repeated_payments = false;
  data.webhook = 'http://www.example.com/webhook/';

  Insta.createPayment(data, function (error, response) {
    if (error) {
      res.send('Error');
      //error
    } else {
      const responseData = JSON.parse(response);
      console.log(response);
      const redirectUrl = responseData.payment_request.longurl;
      res.status(200).json(redirectUrl);
    }
  });
};

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
    orders: [],
    cart: [],
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
  const { email } = req.body;
  console.log(`email 2 is ${email}`);
  const user2 = await validateLogout(email);
  res.send(user2);
};

const validateLogout = async (email2) => {
  try {
    const user_logout = await findUserByEmail(email2);
    console.log(`in func ${user_logout}`);

    const updateUser = await User.findByIdAndUpdate(user_logout._id, {
      $set: { active: false },
    });

    console.log(updateUser);

    return [true, updateUser];
  } catch (error) {
    return [false, error];
  }
};

//SIGNIN
module.exports.signInUser = async (req, res) => {
  const { email } = req.body;

  const isExisting2 = await findUserByEmail(email);

  if (!isExisting2) {
    return res.send([false, 'User Does not Exist']);
  }

  const otpGenerated2 = generateOTP();

  const updateUser2 = await User.findByIdAndUpdate(isExisting2._id, {
    $set: { otp: otpGenerated2, active: false },
  });

  try {
    let msg = await sendMail({
      to: email,
      OTP: otpGenerated2,
    });
    console.log('Message is ', msg);
    res.send([true, updateUser2]);
  } catch (error) {
    res.send([false, 'Unable to sign up, Please try again later', error]);
  }
};
