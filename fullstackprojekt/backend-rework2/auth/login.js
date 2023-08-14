import {        
    validateEmail,
    validateFields,
    validatePassword,    
  } from "../services/register_service.js";

import {getUser, addSession} from "../services/login_service.js";

export const sessions = {};

export default function loginUser (req, res) {


    const validation = validateFields(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, message: validation.message });
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
  
    const { email, password } = req.body;
  
    // Felhasználó lekérdezése az adatbázisból
    getUser(email, (err, user) => {
      if (err) {
        console.error("Failed to get user:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error during login" });
      }
      if (!user) {
        return res
          .status(401)
          .json({ success: false, error: "No registered user found in database" });
      }
  
      const { id, password: hashedPassword, username, role } = user;
      comparePassword(password, hashedPassword)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
          }
  
          addSession(res, id, email, role, username)
         
        })
        .catch((error) => {
          console.error("Login error:", error);
          return res
            .status(500)
            .json({ success: false, error: "Error during login" });
        });
    });
  };
