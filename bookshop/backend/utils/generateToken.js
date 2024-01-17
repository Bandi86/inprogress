import jwt from 'jsonwebtoken'

const generateToken = (res, username) => {
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 60 * 24 * 60 * 1000,
  })

  return token
}

export default generateToken
