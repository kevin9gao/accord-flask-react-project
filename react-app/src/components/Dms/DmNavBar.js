import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersList from '../UsersList';

const DmNavBar = () => {

    return (
        <div>
            <UsersList />
        </div>
    )
}

export default DmNavBar;
