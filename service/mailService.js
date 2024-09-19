import { promises } from "nodemailer/lib/xoauth2";

var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText, thankMsg) {
  var transporter = nodemailer.createTransport({
    // service: "gmail",
    host: process.env.NEXT_PUBLIC_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_USERNAME,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: otpText,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        reject(error); // Reject the promise in case of an error
      } else {
        console.log("Email Sent");
        resolve(true); // Resolve the promise on success
      }
    });
  })
}