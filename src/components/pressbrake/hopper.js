// import libraries and dependencies
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

//import components and functions
import PressBrakeDashboard from "./dashboard"
import PressBrakePriority from './modals/priority'
import PressBrakeActions from './modals/actions'
import PressBrakeCell from './modals/assigntocell'
import PressBrakeOnthejob from './modals/onthejob'

import { fetchDulers } from '../../store/thunks/dulers'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

// Component
const PressBrakeHopper = () => {

    const dulers = useSelector((state) => state.dulers)
    const dispatch = useDispatch()

    ////////////////////////////// SOCKET //////////////////////////////
    const [fetchData, setFetchData] = useState(true)
    
    socket.emit('room', 'press-brake')
    socket.on('received_update', (data) => {

        setFetchData(true)
    })

    useEffect(()=>{
        dispatch(fetchDulers({}))
        setFetchData(false)
    }, [dispatch, fetchData])

    return(

        <div className="d-grid gap-2 mb-5">

            <PressBrakeDashboard/>          

            <Row className='grid-hopper text-center'>
                <Col>QUEUE</Col>
            </Row>  

            <Row className='display-row text-center'>
                <Col xs={1} >Status</Col>
                <Col xs={2} >Order</Col>
                <Col xs={3} >Part</Col>
                <Col xs={1} >Quantity</Col>
                <Col xs={2} >Release Date</Col>
                <Col xs={1} >Priority</Col>
                <Col xs={1} >Cell</Col>
                <Col xs={1} >Actions</Col>
            </Row> 
            {dulers.orders ?
                dulers.orders.items.map((item)=>(
                    (item.status === "queue" ? 
                        <Row className={`display-row text-center ${item.typeOfCard}`} key={item._id}>
                            {(item.typeOfCard === 'build' || item.typeOfCard === 'engineering') && item.cardPriority === 2 ?
                                <Col xs={1} className='display-col temp-p'>PRIORITY</Col>
                            :
                                <Col xs={1} className='display-col'>{item.status}</Col>     
                            }      
                            <Col xs={2} className='display-col'>
                                {item.salesOrder}<br/>
                                {item.customer}
                            </Col>
                            <Col xs={3} className='display-col'>
                                {item.partNumber}<br/>
                                {item.description}<br/>
                                {item.qrCode.slice(-4).toUpperCase()}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakePriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row> 
                    :null)
                ))
            :null}

            <Row className='grid-cell text-center mt-5'>
                <Col>5130-A</Col>
            </Row>
            <Row className='display-row text-center'>
                <Col xs={1} >Status</Col>
                <Col xs={2} >Order</Col>
                <Col xs={2} >Part</Col>
                <Col xs={1} >Quantity</Col>
                <Col xs={2} >Release Date</Col>
                <Col xs={1} >Priority</Col>
                <Col xs={1} >Cell</Col>
                <Col xs={1} >On the Job</Col>
                <Col xs={1} >Actions</Col>
            </Row> 
            {dulers.orders ?
                dulers.orders.items.map((item)=>(
                    (item.status === "5130-a" ? 
                        <Row className={`display-row text-center ${item.typeOfCard}`} key={item._id}>
                            {(item.typeOfCard === 'build' || item.typeOfCard === 'engineering') && item.cardPriority === 2 ?
                                <Col xs={1} className='display-col temp-p'>PRIORITY</Col>
                            :
                                <Col xs={1} className='display-col'>{item.status}</Col>     
                            }      
                            <Col xs={2} className='display-col'>
                                {item.salesOrder}<br/>
                                {item.customer}
                            </Col>
                            <Col xs={2} className='display-col'>
                                {item.partNumber}<br/>
                                {item.description}<br/>
                                {item.qrCode.slice(-4).toUpperCase()}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakePriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeOnthejob item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row> 
                    :null)
                ))
            :null}

            <Row className='grid-cell text-center mt-5'>
                <Col>5130-B</Col>
            </Row>  
            <Row className='display-row text-center'>
                <Col xs={1} >Status</Col>
                <Col xs={2} >Order</Col>
                <Col xs={2} >Part</Col>
                <Col xs={1} >Quantity</Col>
                <Col xs={2} >Release Date</Col>
                <Col xs={1} >Priority</Col>
                <Col xs={1} >Cell</Col>
                <Col xs={1} >On the Job</Col>
                <Col xs={1} >Actions</Col>
            </Row> 
            {dulers.orders ?
                dulers.orders.items.map((item)=>(
                    (item.status === "5130-b" ? 
                        <Row className={`display-row text-center ${item.typeOfCard}`} key={item._id}>
                            {(item.typeOfCard === 'build' || item.typeOfCard === 'engineering') && item.cardPriority === 2 ?
                                <Col xs={1} className='display-col temp-p'>PRIORITY</Col>
                            :
                                <Col xs={1} className='display-col'>{item.status}</Col>     
                            }
                            <Col xs={2} className='display-col'>
                                {item.salesOrder}<br/>
                                {item.customer}
                            </Col>
                            <Col xs={2} className='display-col'>
                                {item.partNumber}<br/>
                                {item.description}<br/>
                                {item.qrCode.slice(-4).toUpperCase()}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakePriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeOnthejob item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row> 
                    :null)
                ))
            :null}

            <Row className='grid-cell text-center mt-5'>
                <Col>5230</Col>
            </Row>
            <Row className='display-row text-center'>
                <Col xs={1} >Status</Col>
                <Col xs={2} >Order</Col>
                <Col xs={2} >Part</Col>
                <Col xs={1} >Quantity</Col>
                <Col xs={2} >Release Date</Col>
                <Col xs={1} >Priority</Col>
                <Col xs={1} >Cell</Col>
                <Col xs={1} >On the Job</Col>
                <Col xs={1} >Actions</Col>
            </Row> 
            {dulers.orders ?
                dulers.orders.items.map((item)=>(
                    (item.status === "5230" ? 
                        <Row className={`display-row text-center ${item.typeOfCard}`} key={item._id}>
                            {(item.typeOfCard === 'build' || item.typeOfCard === 'engineering') && item.cardPriority === 2 ?
                                <Col xs={1} className='display-col temp-p'>PRIORITY</Col>
                            :
                                <Col xs={1} className='display-col'>{item.status}</Col>     
                            }
                            <Col xs={2} className='display-col'>
                                {item.salesOrder}<br/>
                                {item.customer}
                            </Col>
                            <Col xs={2} className='display-col'>
                                {item.partNumber}<br/>
                                {item.description}<br/>
                                {item.qrCode.slice(-4).toUpperCase()}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakePriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeOnthejob item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row> 
                    :null)
                ))
            :null}
            <Row className='grid-cell text-center mt-5'>
                <Col>7036</Col>
            </Row>  
            <Row className='display-row text-center'>
                <Col xs={1} >Status</Col>
                <Col xs={2} >Order</Col>
                <Col xs={2} >Part</Col>
                <Col xs={1} >Quantity</Col>
                <Col xs={2} >Release Date</Col>
                <Col xs={1} >Priority</Col>
                <Col xs={1} >Cell</Col>
                <Col xs={1} >On the Job</Col>
                <Col xs={1} >Actions</Col>
            </Row> 
            {dulers.orders ?
                dulers.orders.items.map((item)=>(
                    (item.status === "7036" ? 
                        <Row className={`display-row text-center ${item.typeOfCard}`} key={item._id}>
                            {(item.typeOfCard === 'build' || item.typeOfCard === 'engineering') && item.cardPriority === 2 ?
                                <Col xs={1} className='display-col temp-p'>PRIORITY</Col>
                            :
                                <Col xs={1} className='display-col'>{item.status}</Col>     
                            }
                            <Col xs={2} className='display-col'>
                                {item.salesOrder}<br/>
                                {item.customer}
                            </Col>
                            <Col xs={2} className='display-col'>
                                {item.partNumber}<br/>
                                {item.description}<br/>
                                {item.qrCode.slice(-4).toUpperCase()}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakePriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeOnthejob item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row> 
                    :null)
                ))
            :null}

            <Row className='grid-cell text-center mt-5'>
                <Col>Slip-Roll</Col>
            </Row>
            <Row className='display-row text-center'>
                <Col xs={1} >Status</Col>
                <Col xs={2} >Order</Col>
                <Col xs={2} >Part</Col>
                <Col xs={1} >Quantity</Col>
                <Col xs={2} >Release Date</Col>
                <Col xs={1} >Priority</Col>
                <Col xs={1} >Cell</Col>
                <Col xs={1} >On the Job</Col>
                <Col xs={1} >Actions</Col>
            </Row> 
            {dulers.orders ?
                dulers.orders.items.map((item)=>(
                    (item.status === "slip-roll" ? 
                        <Row className={`display-row text-center ${item.typeOfCard}`} key={item._id}>
                            {(item.typeOfCard === 'build' || item.typeOfCard === 'engineering') && item.cardPriority === 2 ?
                                <Col xs={1} className='display-col temp-p'>PRIORITY</Col>
                            :
                                <Col xs={1} className='display-col'>{item.status}</Col>     
                            }
                            <Col xs={2} className='display-col'>
                                {item.salesOrder}<br/>
                                {item.customer}
                            </Col>
                            <Col xs={2} className='display-col'>
                                {item.partNumber}<br/>
                                {item.description}<br/>
                                {item.qrCode.slice(-4).toUpperCase()}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakePriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeOnthejob item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <PressBrakeActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row> 
                    :null)
                ))
            :null}
        </div>
    )
}

export default PressBrakeHopper