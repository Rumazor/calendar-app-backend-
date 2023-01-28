// Rutas de usuarios / Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const { newUser, loginUser, renewUserToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJwt } = require("../middlewares/validate-jwt");
const router = Router();

router.post(
  "/",
  [
    // middlewares
    check("email", "email must be required").isEmail(),
    check("password", "must be with 6 or greater  characters").isLength({
      min: 6,
    }),
  ],
  //middleware
  validateFields,
  loginUser
);

router.post(
  "/new",
  [
    // middlewares
    check("name", "name must be required").not().isEmpty(),
    check("email", "email must be required").isEmail(),
    check("password", "must be with greater that 6 characters").isLength({
      min: 6,
    }),
  ],
  //middleware
  validateFields,
  newUser
);

router.get("/renew", validateJwt, renewUserToken);

module.exports = router;
