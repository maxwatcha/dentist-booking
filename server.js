const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss=require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp=require('hpp');
const cors = require('cors');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

// //Body parser
const app=express();
app.use(express.json());

// //swagger
// const swaggerOptions = {
//     swaggerDefinition:{
//         openapi: '3.0.0',
//         info: {
//             title: 'Library API',
//             version: '1.0.0',
//             description: 'A simple Express VacQ API'
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3000/api/v1'
//             }
//         ]
        
//     },
//     apis:['./routes/*.js']
// };
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Cookie parser
app.use(cookieParser());

//Sanitzie data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Enable CORS
app.use(cors());
//rateLimit
const limiter = rateLimit({
    windowsMs:10*60*1000,//10 mins
    max: 100
});
app.use(limiter);

//route files
const dentists = require ('./routes/dentists');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings')

//Prevent http param pollutions
app.use(hpp());

app.use('/api/v1/dentists',dentists);
app.use('/api/v1/auth',auth);
 app.use('/api/v1/bookings', bookings);



// app.get('/', (req,res) => {
//     res.send("<h1>Hello from express</h1>");
//     // res.send({name:"Brad"});
//     // res.json({name:"Brad"});
//     // res.sendStatus(400);
//     // res.status(400).json({success:false});
//      res.status(200).json({success:true, data:{id:1}});
// });



const PORT=process.env.PORT || 3000;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1))

});
