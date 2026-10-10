import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "salmanali162009@gmail.com",
    pass: process.env.APP_PASS
  }
});

const sendResetEmail = async (email, resetToken) => {
  const resetLink =
    `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  try {
    const info = await transporter.sendMail({
      from: `"Authentication App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",

      html: `
        <h2>Password Reset</h2>

        <p>You requested a password reset.</p>

        <p>Click below to reset your password:</p>

        <a href="${resetLink}">
          Reset Password
        </a>

        <p>This link will expire in 15 minutes.</p>

        <p>If you did not request this, ignore this email.</p>
      `
    });

    console.log("Email sent:", info.messageId);

    return info;

  } catch (error) {
    console.error("Nodemailer error:", error);
    throw error;
  }
};

export default sendResetEmail;