import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersList from '../UsersList';

const DmNavBar = () => {

    return (
        <div>
            <UsersList />
            <h3> Any other fillers we want on the main page of private server. This should be replaced when a chat pops up</h3>
        </div>
    )
}

export default DmNavBar;
