import React from 'react';
import { Link } from 'react-router-dom'; // probably will need this
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    return (
        <header>

        </header>
    )
};

export default Header;