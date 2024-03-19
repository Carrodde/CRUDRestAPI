const { check, validationResult } = require("express-validator");
const playerValidator = [
  check("name")
    .escape()
    .not()
    .isEmpty()
    .withMessage("Can't be empty")
    .bail()
    .not()
    .isNumeric()
    .withMessage("Player's name can't contain numbers")
    .isLength({ min: 4 })
    .withMessage("Player's name needs to contain both firstname and lastname")
    .bail(),
  check("jersey")
    .not()
    .isEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isNumeric()
    .withMessage("You must write a number")
    .bail()
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = {
  playerValidator,
};
