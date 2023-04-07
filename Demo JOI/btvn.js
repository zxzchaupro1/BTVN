const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const users = [
  { id: 01, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 02, username: 'user', password: 'user123', role: 'user' },
  { id: 03, username: 'admin1', password: 'admin123', role: 'admin' },
];

const loginSchema = Joi.object({
  username: Joi.string()
  .min(3)
  .max(30)
  .required(),

  password: Joi.string()
  .min(3)
  .max(30)
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .required(),
})

// Middleware xử lý đăng nhập
const loginMiddleware = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });  //check lỗi 
  }

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không chính xác!' });
  }
  req.user = user;
  next();
};


const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Bạn không thể truy cập vào trang quản trị' });
  }
  next();
};

app.post('/login', loginMiddleware, isAdmin, (req, res) => {
  res.redirect('/admin')
});

app.get('/admin', (req, res) => {
  res.send('Admin');
});


app.listen(3001, () => {
  console.log('Server is running');
});