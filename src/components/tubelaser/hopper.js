// import libraries and dependencies
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

//import components and functions
import TubeLaserPriority from './modals/priority'
import TubeLaserActions from './modals/actions'
import TubeLaserCell from './modals/assigntocell'
import TubeLaserOnthejob from './modals/onthejob'

import { fetchDulers } from '../../store/thunks/dulers'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

// Component
const TubelaserHopper = () => {

    const dulers = useSelector((state) => state.dulers)
    const dispatch = useDispatch()

    ////////////////////////////// SOCKET //////////////////////////////
    const [fetchData, setFetchData] = useState(true)

    socket.emit('room', 'tube-laser')
    socket.on('received_update', (data) => {
        setFetchData(true)
    })
    
    // if (fetchData) {
    //     dispatch(fetchDulers({}))
    //     setFetchData(false)
    // }

    useEffect(()=>{
        dispatch(fetchDulers({}))
        setFetchData(false)
    }, [dispatch, fetchData])
    
    return(

        <div className="d-grid gap-2 mt-5 mb-5">

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
                                {item._id}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <TubeLaserPriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <TubeLaserCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <TubeLaserActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row> 
                    :null)
                ))
            :null}

            <Row className='grid-cell text-center mt-5'>
                <Col>TUBE LASER 01</Col>
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
                    (item.status === "tl-01" ? 
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
                                {item._id}
                            </Col>
                            <Col xs={1} className='display-col'>{item.quantity}</Col>
                            <Col xs={2} className='display-col'>
                                {(new Date(item.releaseDate).getMonth()+1) + '-' 
                                + new Date(item.releaseDate).getDate() + '-' 
                                + new Date(item.releaseDate).getFullYear()}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <TubeLaserPriority item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <TubeLaserCell item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <TubeLaserOnthejob item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                            <Col xs={1} className='display-col'>
                                {/* ==================== MODAL ==================== */}
                                    <TubeLaserActions item={item}/>
                                {/* ==================== END OF MODAL ==================== */}
                            </Col>
                        </Row>
                    :null)
                ))
            :null}
        </div>
    )
}

export default TubelaserHopper