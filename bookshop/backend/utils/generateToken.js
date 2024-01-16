import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  // Ha az id nem string, akkor konvertáljuk UUID típusú stringgé
  const userId = typeof id === 'string' ? id : id.toString();

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: 'strict',
    maxAge: 30 * 60 * 24 * 60 * 1000,
  });
  
  return token;
};

export default generateToken;
