import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Header = () => {

    const { logOut, user } = useContext(AuthContext);

    //log out
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.error(error)

            })

    }
    const menuItems = <>
        <li>
            <Link to='/' className='btn btn-ghost'>Home</Link>
            <Link to='/blog' className='btn btn-ghost'>Blog</Link>

            {
                user?.uid
                    ?
                    <>

                        <Link to='/myreviews' className='btn btn-ghost'>My reviews</Link>

                        <Link to='/addservice' className='btn btn-ghost'>Add Service</Link>

                        <Link onClick={handleLogOut} className='btn btn-ghost'>Log Out</Link>
                    </>
                    :
                    <>
                        <Link to='/login' className='btn btn-ghost'>Log In</Link>

                    </>
            }

        </li>
    </>


    return (
        <div className="navbar bg-fuchsia-900">
            <div className="navbar-start bg-fuchsia-900">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <img className='w-8 rounded' src="https://i.pinimg.com/736x/7e/56/0c/7e560cacf1c2ad43d7f5fa794983435b.jpg" alt="" />
                <Link to='/' className="btn btn-ghost text-white normal-case text-xl">Photo with Artisan</Link>
            </div>
            <div className="navbar-center text-white hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn glass">Get started</a>
            </div>
        </div>
    );
};

export default Header;