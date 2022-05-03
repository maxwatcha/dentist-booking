const express = require('express');
const {getDentists, getDentist, createDentist, updateDentist, deleteDentist,getBookings} = require('../controllers/dentists');
const router = express.Router()

//Include other resource routers
//const appointmentRouter=require('./appointments');

const {protect,authorize} = require('../middleware/auth');
// const swaggerJsdoc = require('swagger-jsdoc');
// const { UCS2_UNICODE_CI } = require('mysql/lib/protocol/constants/charsets');
const Dentist = require('../models/Dentist');


// /**
// * @swagger
// * components:
// *    schemas:
// *        Hospitals:
// *            type: object
// *            required:
// *               -   name
// *               -   address
// *            properties:
// *                id:
// *                    type: string
// *                    format: uuid
// *                    description: The auto-generated id of the Hospital
// *                    example: d290f1ee-6c54-4b01-90e6-d701748f0851
// *                ลำดับ:
// *                    type: string
// *                    description: Oridinal number
// *                name:
// *                    type: string
// *                    description: Hospital name
// *                address:
// *                    type: string
// *                    description: House No., Street, Road
// *                district:
// *                    type: string
// *                    description: District
// *                province:
// *                    type: string
// *                    description: province
// *                postalcode:
// *                    type: string
// *                    description: 5-digit postal code
// *                tel:
// *                    type: string
// *                    description: telephone number
// *                region:
// *                    type: string
// *                    description: region
// *            example:
// *                id: 609bda561452242d88d36e37
// *                ลำดับ: 121
// *                name: Happy Hospital
// *                address: 121 ถ.สุขุมวิท
// *                district: บางนา
// *                province: กรุงเทพมหานคร
// *                postalcode: 10110
// *                tel: 02-2187000
// *                region: กรุงเทพมหานคร (Bangkok)
// */

//Re-route into other resource routers
// router.use('/:dentistId/bookings/',appointmentRouter);

// router.route('/').get(getDentists).post(protect, authorize('admin'),createDentists);
// //router.route('/vacCenters').get(getVacCenters);
// router.route('/:id').get(getDentist).put(protect, authorize('admin'),updateDentist).delete(protect,authorize('admin'), deleteDentist);

module.exports=router;



// /**
//  * @swagger
//  * tags:
//  *  name: Hospitals
//  *  description: The hospitals managing API
//  */

// /**
//  * @swagger
//  * /hospitals:
//  *  get:
//  *      summary: Returns the list of all the hospitals
//  *      tags: [Hospitals]
//  *      responses:
//  *          200:
//  *              description: The list of the hospitals
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: array
//  *                          items:
//  *                              $ref: '#/components/schemas/Hospitals'
//  */

// /**
//  * @swagger
//  * /hospitals/{id}:
//  *  get:
//  *      summary: Get the hospital by id
//  *      tags: [Hospitals]
//  *      parameters:
//  *          -   in: path
//  *              name: id
//  *              schema:
//  *                  type: string
//  *              required: true
//  *              description: The hospital id
//  *      responses:
//  *          200:
//  *              description: The hospital description by id
//  *              contents:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/Hospitals'
//  *          404:
//  *              desciption: The hospital was not found
//  */

// /**
//  * @swagger
//  * /hospitals:
//  *  post:
//  *      summary: Create a new hospital
//  *      tags: [Hospitals]
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: '#/components/schemas/Hospitals'
//  *      responses:
//  *          201:
//  *              description: The hospital was successfully created
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/Hospitals'
//  *          500:
//  *              description: Some server error
//  */

// /**
//  * @swagger
//  * /hospitals/{id}:
//  *   put:
//  *      summary: Update the hospital by the id
//  *      tags: [Hospitals]
//  *      parameters:
//  *          -   in: path
//  *              name: id
//  *              schema:
//  *                  type: string
//  *              required: true
//  *              description: The hospital id
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: '#/components/schemas/Hospitals'
//  *      responses:
//  *          200:
//  *              description: The hospital was updated
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/Hospitals'
//  *          404:
//  *              description: The hospital was not found
//  *          500:
//  *              description: Some server error
//  */

// /**
//  * @swagger
//  * /hospitals/{id}:
//  *  delete:
//  *      summary: Remove the hospital by id
//  *      tags: [Hospitals]
//  *      parameters:
//  *          -   in: path
//  *              name: id
//  *              schema:
//  *                  type: string
//  *              required: true
//  *              description: The hospital id
//  * 
//  *      responses:
//  *          200:
//  *              description: The hospital was deleted
//  *          404:
//  *              description: The hospital was not found
//  */