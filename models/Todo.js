const mongoose = require("mongoose");

const Todos = mongoose.Schema;

let todoSchema = new Todos ({
    user: {type: mongoose.Schema.Types.ObjectId},
    items: {type: Array}
});

module.exports = mongoose.model("todos", todoSchema);