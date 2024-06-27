import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import environment from "../utils/env.util.js";

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });
    await transport.verify();
    await transport.sendMail({
      from: `The Android's Dungeon <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `
        <h1> Welcome to The Android's Dungeon!</h1>
        <p>VERIFY CODE: ${data.code}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
