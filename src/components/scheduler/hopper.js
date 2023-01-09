// import libraries and dependencies
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

//import components and functions
import { fetchDulers } from '../../store/thunks/dulers';
import SchedulerModal from './modal'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const SchedulerHopper = () => {
    const dulers = useSelector((state) => state.dulers)
    const dispatch = useDispatch()

    ////////////////////////////// SOCKET //////////////////////////////
    const [fetchData, setFetchData] = useState(true)

    socket.emit('room', 'scheduler')
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

    return (

        <div className="d-grid gap-2 mt-5 mb-5">

            <Row className='grid-staging text-center'>
                <Col>STAGING</Col>
            </Row>       
            <Row className='display-row text-center'>
                <Col xs={1}>Status</Col>
                <Col xs={3}>Order</Col>
                <Col xs={3}>Part</Col>
                <Col xs={2}>Quantity</Col>
                <Col xs={2}>Release Date</Col>
                <Col xs={1}>Launch</Col>
            </Row>     
            {dulers.orders ?
                dulers.orders.items.map((item)=>(
                    <Row className={`display-row text-center ${item.typeOfCard}`} key={item._id}>
                        <Col xs={1} className='display-col'>{item.status}</Col>
                        <Col xs={3} className='display-col'>
                            {item.salesOrder}<br/>
                            {item.customer}
                        </Col>
                        <Col xs={3} className='display-col'>
                            {item.partNumber}<br/>
                            {item.description}<br/>
                            {item._id}
                        </Col>
                        <Col xs={2} className='display-col'>{item.quantity}</Col>
                        <Col xs={2} className='display-col'>
                            {(new Date(item.releaseDate).getMonth()+1) + '-' 
                            + new Date(item.releaseDate).getDate() + '-' 
                            + new Date(item.releaseDate).getFullYear()}
                        </Col>
                        <Col xs={1} className='display-col'>
                            {/* ==================== MODAL ==================== */}
                                <SchedulerModal item={item}/>
                            {/* ==================== END OF MODAL ==================== */}
                        </Col>
                    </Row> 
                ))
            :null}
        </div>
    )
}

export default SchedulerHopper