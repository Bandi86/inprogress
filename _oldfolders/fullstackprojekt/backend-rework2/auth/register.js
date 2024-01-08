import { nanoid } from "nanoid";
import { hashPassword } from "../../backend-rework/services/password.js";
import {
  createUser,
  isEmailTaken,
  validateEmail,
  validateFields,
  validatePassword,
  validateUsername,
} from "../services/register_service.js";

export default async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const saltRounds = 10;
  const id = nanoid();
  let role = "";
  const created_at = Date.now();

  if (email.toLowerCase() === "susutechno@gmail.com") {
    role = "admin";
  } else {
    role = "user";
  }

  try {
    const validation = validateFields(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, message: validation.message });
    }

    const validationUser = validateUsername(req.body.username);
    if (!validationUser.success) {
      return res
        .status(400)
        .json({ success: false, message: validationUser.message });
    }

    const validationPassword = validatePassword(req.body.password);
    if (!validationPassword.success) {
      return res
        .status(400)
        .json({ success: false, message: validationPassword.message });
    }

    const validationEmail = validateEmail(req.body.email);
    if (!validationEmail.success) {
      return res
        .status(400)
        .json({ success: false, message: validationEmail.message });
    }

    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const hashedPassword = await hashPassword(password, saltRounds);

    if (
      validation.success &&
      validationUser.success &&
      validationPassword.success &&
      validationEmail.success &&
      !emailTaken
    ) {
      createUser(id, username, email, hashedPassword, role, created_at)
        .then(() => {
          console.log(
            "Felhasználó létrehozva",
            "Felhasználónév",
            username,
            "Email",
            email,
            "Jelszó",
            "role",
            role,
            hashedPassword,
            "Idő",
            convertDate(created_at)
          );
          return res
            .status(200)
            .json({ success: true, message: "User created" });
        })
        .catch((error) => {
          console.error("Error during user creation:", error);
          return res.status(500).json({
            success: false,
            message: "Registration Failed",
            error: error.message,
          });
        });
    } 
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      success: false,
      message: "Registration Failed",
      error: error.message,
    });
  }
}
