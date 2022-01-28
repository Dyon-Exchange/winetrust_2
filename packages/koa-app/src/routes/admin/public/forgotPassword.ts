import { sign } from "jsonwebtoken";
import { Request } from "koa";
import nodemailer from "nodemailer";

import Admin, { AdminClass } from "../../../models/Admin";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface ForgotPassword extends Request {
  body: {
    email: string;
    password: string;
  };
}

const serverMapping = {
  'localhost:3030' : 'localhost:3000',
}

export default async (ctx: ExtendedContext<ForgotPassword>) => {
  const { email } = ctx.request.body;

  const account = await Admin.findOne({ email });
  if (account === undefined || account === null) {
    ctx.throw(404, "Account not found.");
  }

  var transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
  });

  const payload = {
    id: account._id,
  };

  const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: 300 });

  var mailOptions = {
    from: "alexandersequena@gmail.com",
    to: `${email}`,
    subject: "Password Reset Link",
    text: `${serverMapping[ctx.request.get('host')]}/changepassword/${token}`,
  };
  console.log(mailOptions.text)
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
  // const refreshToken = sign(payload, process.env.REFRESH_SECRET, {
  //   expiresIn: "7d",
  // });

  ctx.body = { status: "Password reset sent successfully." };
};
