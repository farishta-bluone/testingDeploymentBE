
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
// const bodyParser = require('body-parser');

exports.validateUser = (req, res, next) => {
    User.fetchAll(req.body)
      .then(([rows]) => {
        if(rows.length > 0) {
            const accessToken = jwt.sign({ id: rows[0].id, name: rows[0].name,  role: rows[0].role }, accessTokenSecret);
            res.send({
                token: accessToken,
                user: rows[0]
            });
        } else {
            res.status(401).send({msg: 'Username or password incorrect'});
        }
      })
      .catch(err => console.log(err));
  };
