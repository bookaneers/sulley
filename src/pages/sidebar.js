// import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// import icons
import { GoDashboard } from 'react-icons/go';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaShippingFast, FaBoxOpen, FaTasks } from 'react-icons/fa';
import { MdOutlineCompress } from 'react-icons/md';
import { GiNestEggs, GiLaserburn, GiCircularSawblade, GiAncientScrew, GiStraightPipe, GiLeadPipe,
    GiNeedleDrill, GiFlintSpark, GiRobotGolem, GiHexagonalNut, GiPuzzle, GiSewingMachine, GiSpray} 
    from 'react-icons/gi';


const Sidebar = () => {
    return(
        <>
            {/* <Navbar className='vertical'>
                <LinkContainer to='/'>
                    <Navbar.Brand>SCHEDULER</Navbar.Brand>
                </LinkContainer>
            </Navbar> */}
            <Nav className='vertical'>
                <Nav.Item className='nav-item'>
                    <LinkContainer to='/'>
                        <Nav.Link><GoDashboard className='react-icon'/> &nbsp;&nbsp; Dashboard</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item className='nav-item'>
                    <LinkContainer to='/scheduler'>
                        <Nav.Link><AiOutlineSchedule className='react-icon'/> &nbsp;&nbsp; Scheduler</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/nesting'>
                        <Nav.Link><GiNestEggs className='react-icon'/> &nbsp;&nbsp; Nesting</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/laserprogram'>
                        <Nav.Link><FaTasks className='react-icon'/> &nbsp;&nbsp; Laser Programs</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/laser'>
                        <Nav.Link><GiLaserburn className='react-icon'/> &nbsp;&nbsp; Laser</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/press-brake'>
                        <Nav.Link><MdOutlineCompress className='react-icon'/> &nbsp;&nbsp; Press Brake</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/tube-laser'>
                        <Nav.Link><GiStraightPipe className='react-icon'/> &nbsp;&nbsp; Tube Laser</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/tube-bender'>
                        <Nav.Link><GiLeadPipe className='react-icon'/> &nbsp;&nbsp; Tube Bender</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/saw'>
                        <Nav.Link><GiCircularSawblade className='react-icon'/> &nbsp;&nbsp; Saw</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/mill'>
                        <Nav.Link><GiNeedleDrill className='react-icon'/> &nbsp;&nbsp; Mill</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/lathe'>
                        <Nav.Link><GiAncientScrew className='react-icon'/> &nbsp;&nbsp; Lathe</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/welding'>
                        <Nav.Link><GiFlintSpark className='react-icon'/> &nbsp;&nbsp; Welding</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/robot-welding'>
                        <Nav.Link><GiRobotGolem className='react-icon'/> &nbsp;&nbsp; Robot Welding</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/powder-coating'>
                        <Nav.Link><GiSpray className='react-icon'/> &nbsp;&nbsp; Powder Coating</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/sew-shop'>
                        <Nav.Link><GiSewingMachine className='react-icon'/> &nbsp;&nbsp; Sew Shop</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/hardware'>
                        <Nav.Link><GiHexagonalNut className='react-icon'/> &nbsp;&nbsp; Hardware</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/final-assembly'>
                        <Nav.Link><GiPuzzle className='react-icon'/> &nbsp;&nbsp; Final Assembly</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/packaging'>
                        <Nav.Link><FaBoxOpen className='react-icon'/> &nbsp;&nbsp; Packaging</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/shipping'>
                        <Nav.Link><FaShippingFast className='react-icon'/> &nbsp;&nbsp; Shipping</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        </>
    )
}

export default Sidebar;