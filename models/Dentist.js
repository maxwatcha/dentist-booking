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

//add cascade
DentistSchema.pre('remove',async function(next){
    console.log(`Bookings being removed from dentist ${this._id}`);
    await this.model('Booking').deleteMany({dentist: this._id});
    next();
});
//Reverse populate with virtuals
DentistSchema.virtual('bookings',{
    ref: 'Booking',
    localField: '_id',
    foreignField: 'dentist',
    justOne:false
});

module.exports=mongoose.model('Dentist',DentistSchema);