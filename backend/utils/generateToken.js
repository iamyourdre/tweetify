import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
  const token = jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '15d'
  });
  res.cookie('jwt', token, {
    httpOnly: true, // prevent XSS attack
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: 'strict', // prevent CSRF attack
    secure: process.env.NODE_ENV === 'production' ? true : false // HTTPS
  })
}

export default generateToken;