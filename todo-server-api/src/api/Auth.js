const {Router} = require('express');
const {verifyToken} = require('../middlewares');
const config = require('../config/auth');
const User = require('../models/_User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = new Router();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, x-refresh-token, Origin, Content-Type, Accept',
  );
  next();
});

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.send({
      message: `User ${newUser.username} was registered successfully!`,
    });
  } catch (error) {
    // need to handle error when user with same username
    next(error);
    return;
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {name: req.body.username},
    });

    if (!user) {
      // TODO
      return res.status(404).send({message: 'User not found.'});
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      // TODO
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({id: user.id}, config.auth_secret, {
      expiresIn: 900, // 15 min //86400, // 24 hours
    });
    const refreshToken = jwt.sign({id: user.id}, config.refresh_secret, {
      expiresIn: 604800, // 86400, // 7 days
    });

    res.status(200).send({
      // id: user._id,
      username: user.username,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
    return;
  }
});

router.post('/refresh', [verifyToken], (req, res) => {
  const oldRefreshToken = req.headers['x-refresh-token'];

  if (oldRefreshToken == null) return res.sendStatus(401);

  jwt.verify(oldRefreshToken, config.refresh_secret, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign({id: user.id}, config.auth_secret, {
      expiresIn: 900, // 15 min
    });
    const newRefreshToken = jwt.sign({id: user.id}, config.refresh_secret, {
      expiresIn: 604800, // 86400
    });
    res.json({accessToken: newAccessToken, refreshToken: newRefreshToken});
  });
});

module.exports = router;
