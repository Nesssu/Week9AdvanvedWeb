const mongoose = require("mongoose");

const Users = mongoose.Schema;

let userSchema = new Users ({
    email: {type: String},
    password: {type: String}

});

module.exports = mongoose.model("users", userSchema);
