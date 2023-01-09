import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const PressBrakeDashboard = () => {

    const [color_5130_a, setColor_5130_a] = useState('green')
    const [color_5130_b, setColor_5130_b] = useState('green')
    const [color_5230, setColor_5230] = useState('green')
    const [color_7036, setColor_7036,] = useState('green')
    const [color_slip_roll, setColor_slip_roll] = useState('green')


    socket.emit('room', 'press-brake-dashboard')
    socket.on('received_update', (data) => {
        if (data.status === '5130-a') { setColor_5130_a(data.color) }
        if (data.status === '5130-b') { setColor_5130_b(data.color) }
        if (data.status === '5230') { setColor_5230(data.color) }
        if (data.status === '7036') { setColor_7036(data.color) }
        if (data.status === 'slip_roll') { setColor_slip_roll(data.color) }
    })

    return(
        <div className='sticky' >
            <Row className='dashboard mb-2'>

                {color_5130_a === 'green' ?
                    <Col className='dashboard-column'><Button className='dashboard-button bg-success text-white'>5130-A</Button></Col>              
                    :(color_5130_a === 'yellow' ?
                        <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-warning text-black'>5130-A</Button></Col>
                        :(color_5130_a === 'red' ?
                            <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-danger text-white'>5130-A</Button></Col>
                        :null)
                    )   
                }

                {color_5130_b === 'green' ?
                    <Col className='dashboard-column'><Button className='dashboard-button bg-success text-white'>5130-B</Button></Col>              
                    :(color_5130_b === 'yellow' ?
                        <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-warning text-black'>5130-B</Button></Col>
                        :(color_5130_b === 'red' ?
                            <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-danger text-white'>5130-B</Button></Col>
                        :null)
                    )   
                }
 
                {color_5230 === 'green' ?
                    <Col className='dashboard-column'><Button className='dashboard-button bg-success text-white'>5230</Button></Col>              
                    :(color_5230 === 'yellow' ?
                        <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-warning text-black'>5230</Button></Col>
                        :(color_5230 === 'red' ?
                            <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-danger text-white'>5230</Button></Col>
                        :null)
                    )   
   
                }

                {color_7036 === 'green' ?
                    <Col className='dashboard-column'><Button className='dashboard-button bg-success text-white'>7036</Button></Col>              
                    :(color_7036 === 'yellow' ?
                        <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-warning text-black'>7036</Button></Col>
                        :(color_7036 === 'red' ?
                            <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-danger text-white'>7036</Button></Col>
                        :null)
                    )   
                }
 
                {color_slip_roll === 'green' ?
                    <Col className='dashboard-column'><Button className='dashboard-button bg-success text-white'>Slip-Roll</Button></Col>              
                    :(color_slip_roll === 'yellow' ?
                        <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-warning text-black'>Slip-Roll</Button></Col>
                        :(color_slip_roll === 'red' ?
                            <Col className='dashboard-column'><Button className='blink-text dashboard-button bg-danger text-white'>Slip-Roll</Button></Col>
                        :null)
                    )   
                }

            </Row>  
        </div>
    )
}

export default PressBrakeDashboard;