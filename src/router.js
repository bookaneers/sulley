// import libraries and dependencies
import { Route, Routes, BrowserRouter } from 'react-router-dom'

//import components and functions
import Search from './pages/search'
import Sidebar from './pages/sidebar'
import MainLayout from './layouts/mainlayout'

import Dashboard from './components/dashboard'
import Scheduler from './components/scheduler/index'
import Nesting from './components/nesting'
import LaserProgram from './components/laserprogram'
import Laser from './components/laser'
import PressBrake from './components/pressbrake/index'
import TubeLaser from './components/tubelaser'
import TubeBender from './components/tubebender'
import Saw from './components/saw'
import Mill from './components/mill'
import Lathe from './components/lathe'
import Welding from './components/welding'
import RobotWelding from './components/robotwelding'
import PowderCoating from './components/powdercoating'
import SewShop from './components/sewshop'
import Hardware from './components/hardware'
import FinalAssembly from './components/finalassembly'
import Packaging from './components/packaging'
import Shipping from './components/shipping'

const Router = () => {
    return(
        <BrowserRouter>
            <MainLayout>
                <div className='search-page'>
                    <Search/>
                </div>
                
                <div className='sidebar-page'>
                    <Sidebar/>
                </div>
                
                <div className='main-page'>
                    <Routes>
                        <Route path='/' element={<Dashboard/>}/>
                        <Route path='scheduler' element={<Scheduler/>}/>
                        <Route path='nesting' element={<Nesting/>}/>
                        <Route path='laserprogram' element={<LaserProgram/>}/>
                        <Route path='laser' element={<Laser/>}/>
                        <Route path='press-brake' element={<PressBrake/>}/>
                        <Route path='tube-laser' element={<TubeLaser/>}/>
                        <Route path='tube-bender' element={<TubeBender/>}/>
                        <Route path='saw' element={<Saw/>}/>
                        <Route path='mill' element={<Mill/>}/>
                        <Route path='lathe' element={<Lathe/>}/>
                        <Route path='welding' element={<Welding/>}/>
                        <Route path='robot-welding' element={<RobotWelding/>}/>
                        <Route path='powder-coating' element={<PowderCoating/>}/>
                        <Route path='sew-shop' element={<SewShop/>}/>
                        <Route path='hardware' element={<Hardware/>}/>
                        <Route path='final-assembly' element={<FinalAssembly/>}/>
                        <Route path='packaging' element={<Packaging/>}/>
                        <Route path='shipping' element={<Shipping/>}/>
                    </Routes>
                </div>
            </MainLayout>
        </BrowserRouter>
    )
}

export default Router
  