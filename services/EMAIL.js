const nodemailer = require('nodemailer');
const { MAIL_SETTINGS } = require('../constants/constants');
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendEmail = async (params) => {
  try {
    var info;
    if (params.prod && params.prod.length > 0) {
      info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: 'tejdharart@gmail.com', // list of receivers
        subject: params.subject, // Subject line
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>New Custom Order Details</h2>
          <p style="margin-bottom: 3px; font-weight:bold;">Name:</p>
          <div style="margin-bottom: 30px;">${params.name}</div>
          <p style="margin-bottom:3px; font-weight:bold;">Phone Number:</p>
          <div style="margin-bottom: 30px; ">${params.phone}</div>
          <p style="margin-bottom: 3px; font-weight:bold;">Email:</p>
          <div style="margin-bottom: 30px;">${params.to}</div>
          <p style="margin-bottom: 3px; font-weight:bold;">Product Name:</p>
          <div style="margin-bottom: 30px;">${params.prod}</div>
          <p style="margin-bottom: 3px; font-weight:bold;">Description:</p>
          <div style="margin-bottom: 30px;">${params.desc}</div>
        </div>
      `,
      });
    } else {
      
      info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: 'tejdharart@gmail.com', // list of receivers
        subject: params.subject, // Subject line
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>New Custom Order Details</h2>
          <p style="margin-bottom: 3px; font-weight:bold;">Name:</p>
          <div style="margin-bottom: 30px;">${params.name}</div>
          <p style="margin-bottom:3px; font-weight:bold;">Phone Number:</p>
          <div style="margin-bottom: 30px; ">${params.phone}</div>
          <p style="margin-bottom: 3px; font-weight:bold;">Email:</p>
          <div style="margin-bottom: 30px;">${params.to}</div>
          <div style="margin-bottom: 30px;">${params.desc}</div>
        </div>
      `,
      });
    }

    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};
