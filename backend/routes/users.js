const router = require('express').Router();
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');
const { validatePatchMe } = require('../middlewares/validate');

router.get('/me', getCurrentUser);
router.patch('/me', validatePatchMe, updateUser);

module.exports = router;
