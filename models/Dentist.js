const mongoose = require('mongoose');
const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 chracters']
    },
    exp_year: {
        type: String,
        required: [true,'Please add year of experience']
    },
    expert_area: {
        type: String,
        required: [true,'Please add area of expertise']
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

module.exports=mongoose.model('Dentist',DentistSchema);