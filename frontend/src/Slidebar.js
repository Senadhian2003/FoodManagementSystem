import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import rmk from './rmk.png';
import ShopIcon from '@mui/icons-material/Shop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import FestivalIcon from '@mui/icons-material/Festival';
import LogoutIcon from '@mui/icons-material/Logout';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function Slidebar() {
  return (
    <div>
  <Sidebar className='sidebar'>
  <Menu>
    <div className='row'> <MenuItem> <img src={rmk} className='logo'/> </MenuItem></div>
    <div className='cont'>
    <div className='row'> <MenuItem className='sub-nav sub-n'> <ShopIcon className="linkt"/> <Link to='/purs' className='pur linkt'>Purchase</Link>  </MenuItem></div>
 <div className='row'><MenuItem className='sub-n'><LocalShippingIcon className="linkt"/><Link to='/dis' className="linkt"> Dispatch </Link> </MenuItem></div>
 <div className='row'><MenuItem className='sub-n'><StoreIcon className="linkt"/> <Link to='/stock' className="linkt">Available Stock</Link> </MenuItem></div>
 <div className='row'> <MenuItem className='sub-n'><AssessmentIcon className="linkt"/><Link to='/rep' className="linkt"> Reports</Link> </MenuItem></div>
 <div className='row'><MenuItem className='sub-n'><CategoryIcon className="linkt"/><Link to='/cat' className="linkt">  Categories </Link></MenuItem></div>
 <div className='row'><MenuItem className='sub-n'><FestivalIcon className="linkt"/><Link to='/ven' className="linkt"> Vendors</Link> </MenuItem></div>
 <div className='row'><MenuItem className='sub-n'><LogoutIcon className="linkt"/><Link to='/' className="linkt">  Logout</Link> </MenuItem></div>
    </div>
  </Menu>
</Sidebar>
    </div>
  )
}

export default Slidebar