//Get all dentists
//Get /api/v1/dentists

const Dentist = require("../models/Dentist");

//public
exports.getDentists = async (req, res,next) =>{
    let query;

    //Copy req.query
    const reqQuery= {...req.query};

    //Fields to exclude
    const removeFields = ['select','sort','page','limit'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);

    //Create query String
    let queryStr=JSON.stringify(req.query);
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,
    match=>`$${match}`);

    query=Dentist.find(JSON.parse(queryStr)).populate('bookings');

    //Select Fields
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query=query.select(fields);
    }

    //Sort
    if(req.query.sort){
        const sortBy= req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10)||25;
    const startIndex=(page-1)*limit;
    const endIndex = page*limit;

    try{
        const total = await Dentist.countDocuments();
        query = query.skip(startIndex).limit(limit);
        //Executing query
        const denstists = await query;

        //Pagination result
        const pagination = {};

        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }
        res.status(200).json({success:true,count:denstists.length, data:denstists});
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
        const dentist = await Dentist.findById(req.params.id);

        if(!dentist){
            return res.status(400).json({success:false});
        }

        dentist.remove();
        res.status(200).json({success:true,data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};