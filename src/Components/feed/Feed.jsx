import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Trending from '../Trending/Trending'; // Assuming Trending is another component

const TrendingPage = () => {
    return (
        <div className="bg-black p-4">
            {/* Display Trending Component */}
            <Trending />
        </div>
    );
};

export default TrendingPage;
