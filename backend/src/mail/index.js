import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

const transport = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'blog-app@space-social.online', // generated ethereal user
    pass: process.env.PASS_MAIL , // generated ethereal password
  },
});

export default transport;
