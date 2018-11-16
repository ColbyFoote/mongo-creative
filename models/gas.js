var mongoose = require('mongoose');
var GasSchema = new mongoose.Schema({
    date: String,
    miles: Number,
    gallons: Number,
    cost: Number
});
mongoose.model('Gas', GasSchema);