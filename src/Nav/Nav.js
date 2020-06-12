import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
        <header className="Nav__header">
            <h1>
                <Link 
                    to="/"
                >
                    Lu's Latin
                </Link>
            </h1>
            <nav>
                <ul className="Nav__ul">
                    <li><NavLink
                        to='/blog'
                        activeClassName="Nav__selected"
                    >
                        Blog
                    </NavLink></li>
                    <li><NavLink
                        to='/fabulae/latinae'
                        activeClassName="Nav__selected"
                    >
                        Fabulae Latinae
                    </NavLink></li>
                    <li><NavLink
                        to='/fabulae/romanae'
                        activeClassName="Nav__selected"
                    >
                        Res Romanae Latine Scriptae
                    </NavLink></li>
                    <li><NavLink
                        to='/ap'
                        activeClassName="Nav__selected"
                    >
                        AP Latin
                    </NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;