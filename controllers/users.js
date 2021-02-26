const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.fetchAll(req.query)
    .then(([rows]) => {
        res.send({rows: rows })
    })
    .catch(err => console.log(err));
};

exports.postAddUser = (req, res, next) => {
    let data = req.body;
    const user = new User(null, data.name, data.pwd, data.role, data.access)
    user.save()
    .then(() => {
        res.send("successfuuly added")
    })
    .catch(err => console.log(err));
};

exports.deleteUser = async (req, res, next) => {
    
    User.delete(parseInt(req.params.id)).then(() => {
        res.send("successfully deleted")
    }).catch(err => console.log(err));
   
    
};

exports.updateUser = (req, res, next) => {
    let data = req.body;
    data.id = parseInt(req.params.id)
    User.update(data)
    .then(() => {
        res.send("updated Successfully")
    })
    .catch(err => console.log(err));
  };