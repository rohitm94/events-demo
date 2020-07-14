const config = require("../config/config");
const User = require("../modules/users/model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log("inside controller signup");
  console.log(req.body);
  
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err,user) => {
    if (err) {
      res.status(500).send({ mess : err });
      return;
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });


    res.status(200).send({
      // id: user._id,
      email: user.email,
      accessToken: token,
      message: "User was registered Successfully"
    });

    // res.send({ message: "User was registered successfully!" });
  });
};

exports.signin = (req, res) => {
  console.log("inside controller login");
  console.log(req.body);
  
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });


      res.status(200).send({
        id: user._id,
        email: user.email,
        accessToken: token
      });
    });
};