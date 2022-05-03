//Get all dentists
//Get /api/v1/dentists

const Dentist = require("../models/Dentist");

//public
exports.getDentists = async (req, res,next) =>{
    try{
        const dentists = await Dentist.find();
        res.status(200).json({success:true,count:dentists.length, data:dentists});

    }catch(err){
    res.status(400).json({success:false})
    }
};

//Get single dentist
//Get /api/v1/dentists/:id
//public
exports.getDentist = async (req, res,next) =>{
    try{
        const dentist = await Dentist.findById(req.params.id);

        if(!dentist){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:dentist});
    }catch(err){
        res.status(400).json({success:false});
    }
};

//Create new dentist
//Get /api/v1/dentists
//private
exports.createDentist = async (req,res,next)=>{
    const dentist = await Dentist.create(req.body);
    res.status(201).json({
        success:true,
        data: dentist
    });
};
//UIpdate dentist
//Get /api/v1/dentists/:id
//public
exports.updateDentist = async(req, res,next) =>{
    try{
        const dentist = await Dentist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        });

        if(!dentist){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true, data:dentist});
    }catch(err){
        res.status(400).json({success:false});
    }
};

//Delete dentist
//Get /api/v1/dentists/:id
//public
exports.deleteDentist = async (req, res,next) =>{
    try{
        const dentist = await Dentist.findByIdAndDelete(req.params.id);

        if(!dentist){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true,data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};