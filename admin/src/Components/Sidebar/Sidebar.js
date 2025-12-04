import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>

        <div className="sidebar-options">
            <NavLink to="/" className="sidebar-option">
                <img src={assets.home} alt="" />
                <p>Home</p>
            </NavLink>
            <NavLink to="/add" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Event</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.allEvent} alt="" />
                <p>Available Events</p>
            </NavLink>
            <NavLink to="/student" className="sidebar-option">
                <img src={assets.student} alt="" />
                <p>Students</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
