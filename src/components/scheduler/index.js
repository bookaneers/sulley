// import libraries and dependencies
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap'

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { showToast } from '../../utils/tools'

// import components and functions
import SchedulerHopper from './hopper'

// validate Order in Meros to make sure piece is in the database
import { validatePartInMeros } from '../../store/thunks/dulers';

// function to add the new item in the database
import { addOrderToDulers } from '../../store/thunks/dulers';

import { fetchDulers } from '../../store/thunks/dulers';

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const Scheduler = () => {

    // define distach const to be use to add data to the database
    const dispatch = useDispatch();

    // define distach const to be use to add data to the database
    const partNumberInput = useRef();

    //define variable to show only the fisrt part of the form (verify part)
    const [verifyPart, setVerifyPart] = useState(false)

    ////////////////////////////// SOCKET //////////////////////////////
    const sendUpdate = (oneduler) => {
        socket.emit('send_update', {message: 'Successful update', room: 'scheduler'});
        dispatch(fetchDulers({}))
    }

    // define form to add order to the system
    const formik = useFormik({
        initialValues: {
            salesOrder:'',
            customer:'',
            partNumber:'',
            description: '',
            processes: [],
            quantity:0,
            typeOfCard:'',
            qrCode:'',
            releaseDate:'',
            cardPriority: 0,
            department: 'scheduler',
            status: 'staging',
            currentProcess: 0
        },
        validationSchema:Yup.object({
            partNumber: Yup
            .string()
            .required('Sorry, this is required')
            .max(10, 'Sorry, max number of char is 10')
            .min(5, 'Sorry, min number of char is 5'),
            salesOrder: Yup
            .string()
            .required('Sorry, this is required')
            .max(5, 'Sorry, max number of char is 5')
            .min(5, 'Sorry, min number of char is 5'),
            customer: Yup
            .string()
            .required('Sorry, this is required')
            .max(40, 'Sorry, max number of char is 40')
            .min(5, 'Sorry, min number of char is 5'),
            quantity: Yup
            .number()
            .positive()
            .required('Sorry, this is required')
            .min(1)
            .max(250, 'Sorry, max quantity is 250'),
            typeOfCard: Yup
            .string()
            .required('Sorry, this is required'),
            qrCode: Yup
            .string()
            .required('Sorry, must scan card')
            .max(22,'Sorry, max number of char is 22')
            .min(22,'Sorry, min number of char is 22'),
            releaseDate: Yup
            .date()
            .required('Sorry, this is required')
        }),

        onSubmit: (values, {resetForm}) => {

            if (values.typeOfCard === 'build' || values.typeOfCard === 'engineering') values.cardPriority = 3;
            if (values.typeOfCard === 'priority') values.cardPriority = 2;
            if (values.typeOfCard === 'recut') values.cardPriority = 1;

            dispatch(addOrderToDulers(values))
            .unwrap()
            .then((response) => {
                if (response.result === 'added'){
                    showToast('SUCCESS', 'New order was added')
                    sendUpdate()
                    // dispatch(fetchDulers({}))
                } else {
                    showToast('ERROR', 'Action not completed')
                }
            })
            resetForm({})
        },

        onReset: () => {
            setVerifyPart(false)
        }
    })

    const handleCheckPart = () => {

        // define const to obtain inputs form the DOM
        const partNumberValue = partNumberInput.current.value;

        // // define const to hold result form validatePartInput function
        // const validatePartInput = validatePartInput(partNumberValue);

        // if data is correct, then dispatch to the database to be validated
        if (partNumberValue) {

            dispatch(validatePartInMeros({partNumber:`${partNumberValue}`}))
            .unwrap()
            .then((response) => {
 
                if (response.result === 'found') {
                    showToast('SUCCESS', 'Part Found')

                    formik.values.description = response.data.description;
                    formik.values.processes = response.data.processes;

                    setVerifyPart(true)
                } else {
                    showToast('ERROR', 'Part not found')
                    setVerifyPart(false)
                    formik.handleReset()
                }
            })
        }   
    }
    
    return(
        <div className="d-grid gap-2 mt-5">

            <Row className='grid-titles text-center'>
                <Col>BUILD  ORDER  CARD</Col>
            </Row>

            <Row className='grid-form text-center'> 
                <Formik>
                    { ()=> (
                        <div className="container">
                            { !verifyPart ?
                                <div className='mt-3'>          
                                    <div className="row">        
                                        <div className="col mb-5">
                                            <label htmlFor="partnumber">Part #</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="partnumber" 
                                                    name="partnumber"
                                                    ref={partNumberInput}
                                                    {...formik.getFieldProps('partNumber')}
                                                />
                                                { formik.errors.partNumber && formik.touched.partNumber ?
                                                    <span className='error'>{formik.errors.partNumber}</span>
                                                :null}
                                        </div>      
                                        <div className="col text-center">
                                            <Button  onClick={handleCheckPart} className="btn-primary mt-4 me-3" type="button">Verify Part Number</Button>

                                            <Button onClick={formik.handleReset} className="btn-primary mt-4 ms-3" variant='danger' type="reset"> Cancel Entry </Button>
                                        </div>
                                    </div>  
                                </div>    
                            :
                                <div className='mt-3'>
                                    <form onSubmit={formik.handleSubmit} className="mb-3"> 
                                        <div className="row">        
                                            <div className="col mb-5">
                                                <label htmlFor="partnumber">Part #</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="partnumber" 
                                                        name="partnumber"
                                                        disabled
                                                        {...formik.getFieldProps('partNumber')}
                                                    />
                                            </div>
                                            <div className="col mb-5">
                                                <label htmlFor="description">Description</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="description" 
                                                    name="description"
                                                    disabled
                                                    {...formik.getFieldProps('description')}
                                                />
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="col mb-5">
                                                <label htmlFor="salesorder">Sales Order #</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        id="salesorder" 
                                                        name="salesorder"
                                                        {...formik.getFieldProps('salesOrder')}
                                                        // value={formik.values.salesorder}
                                                        // onChange={formik.handleChange}
                                                        // onBlur={formik.handleBlur}
                                                    />
                                                    { formik.errors.salesOrder && formik.touched.salesOrder ?
                                                        <span className='error'>{formik.errors.salesOrder}</span>
                                                    :null}
                                            </div>
                                            <div className="col mb-5">
                                                <label htmlFor="customer">Customer</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="customer" 
                                                        name="customer"
                                                        {...formik.getFieldProps('customer')}
                                                    />
                                                    { formik.errors.customer && formik.touched.customer ?
                                                        <span className='error'>{formik.errors.customer}</span>
                                                    :null}
                                            </div>
                                            <div className="col mb-5">
                                                <label htmlFor="quantity">Quantity</label>
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    max="250"
                                                    className="form-control" 
                                                    id="quantity" 
                                                    name="quantity"
                                                    placeholder="max of 250"
                                                    {...formik.getFieldProps('quantity')}
                                                />
                                                { formik.errors.quantity && formik.touched.quantity ?
                                                    <span className='error'>{formik.errors.quantity}</span>
                                                :null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col mb-5">
                                                <label htmlFor="typeofcard">Type of Card</label>
                                                <select
                                                    className="form-control" 
                                                    id="typeofcard" 
                                                    name="typeofcard"
                                                    {...formik.getFieldProps('typeOfCard')}>
                                                    <option value="">Choose...</option>
                                                    <option value="build">Build Order Card</option>
                                                    <option value="engineering">Engineering Card</option>
                                                    <option value="priority">Priority Card</option>
                                                    <option value="recut">Recut Card</option>
                                                </select>
                                                { formik.errors.typeOfCard && formik.touched.typeOfCard ?
                                                    <span className='error'>{formik.errors.typeOfCard}</span>
                                                :null}
                                            </div>
                                            <div className="col mb-5">
                                                <label htmlFor="qrcodelink">QR Code Link</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="qrcode" 
                                                    name="qrcode"
                                                    placeholder="scan QR code here"
                                                    {...formik.getFieldProps('qrCode')}
                                                />
                                                { formik.errors.qrCode && formik.touched.qrCode ?
                                                    <span className='error'>{formik.errors.qrCode}</span>
                                                :null}
                                            </div>
                                            <div className="col mb-5">
                                                <label htmlFor="releasedate">Release Date</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    id="releasedate" 
                                                    name="releasedate"
                                                    {...formik.getFieldProps('releaseDate')}
                                                />
                                                { formik.errors.releaseDate && formik.touched.releaseDate ?
                                                    <span className='error'>{formik.errors.releaseDate}</span>
                                                :null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-3 col d-grid gap-2">
                                                <Button  className="btn btn-primary btn-md " type="submit"> Submit </Button>
                                            </div>
                                            <div className="mt-3 col d-grid gap-2">
                                                <Button  onClick={formik.handleReset} className="btn btn-primary btn-md " variant='danger' type="reset"> Cancel Entry </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                    )}
                </Formik>
            </Row>
            <SchedulerHopper/>
        </div>
    )
}

export default Scheduler;