const {
  createUser,
  loginUser,
  verifyUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/auth.controller");
const { authenticated } = require("../middlwares/auth.middlewares");

const router = require(`express`).Router();

router.post(`/register`, createUser);
router.post(`/login`, loginUser);
router.post(`/verify/:verifyToken`, verifyUser);
router.post(`/logout`, authenticated, logoutUser);
router.post(`/forgot-password`, forgotPassword);
router.post(`/reset-password/:resetToken`, resetPassword);
router.post(`/change-password`, authenticated, changePassword);

module.exports = router;
