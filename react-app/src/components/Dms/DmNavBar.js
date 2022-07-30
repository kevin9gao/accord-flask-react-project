import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersList from '../UsersList';
import './DmNavBar.css';

const DmNavBar = () => {

    return (
            <UsersList />
    )
}

export default DmNavBar;
