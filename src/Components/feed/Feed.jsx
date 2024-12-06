import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CodeIcon from '@mui/icons-material/Code';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import FetchFromApi from '../Utils/Fetch';
import VideoFeed from '../VidoeFeed/VideoFeed';
import './feed.css'



export const Feed = () => {
    const categories = [
        { name: 'Coding', icon: <CodeIcon />, searchTerm: 'Coding' },
        { name: 'ReactJS', icon: <CodeIcon />, searchTerm: 'ReactJS courses' },
        { name: 'NextJS', icon: <CodeIcon />, searchTerm: 'NextJS courses' },
        { name: 'Music', icon: <MusicNoteIcon />, searchTerm: 'Music Videos' },
        { name: 'Education', icon: <SchoolIcon />, searchTerm: 'Education' },
        { name: 'Podcast', icon: <GraphicEqIcon />, searchTerm: 'Podcast' },
        { name: 'Movie', icon: <OndemandVideoIcon />, searchTerm: 'Movie' },
        { name: 'Gaming', icon: <SportsEsportsIcon />, searchTerm: 'Gaming' },
        { name: 'Live', icon: <LiveTvIcon />, searchTerm: 'Live' },
        { name: 'Sport', icon: <FitnessCenterIcon />, searchTerm: 'Sport' },
        { name: 'Gym', icon: <FitnessCenterIcon />, searchTerm: 'Gym Workouts' },
        { name: 'Crypto', icon: <DeveloperModeIcon />, searchTerm: 'Crypto' },
    ];
    const [selectedCat, setSelectedCat] = useState('Coding')
    const [searchTerm, setSearchTerm] = useState('Coding')

    const [fetchedData, setFetchedData] = useState([])

    useEffect(() => {
        FetchFromApi(`https://youtube-v31.p.rapidapi.com/search?q=${searchTerm}&part=snippet%2Cid&regionCode=US&maxResults=50&order=viewCount`).then((data) => {
            setFetchedData(data);
        });
    }, [searchTerm])


    function handleClick(searchTerm, catName) {
        setSearchTerm(searchTerm);
        setSelectedCat(catName);
        window.scroll(0, 0);
    }
    return (
        <div className='feed-container' >

            <div className='side-bar flex flex-row overflow-auto border-gray-600 border-y bg-black p-1'>
                {categories.map((cat) => (
                    <button
                        key={cat.searchTerm}
                        className='side-bar-btn bg-black flex justify-center items-center h-[50px] p-2 rounded-full m-1'
                        style={{ backgroundColor: selectedCat === cat.name ? 'rgb(248 113 113)' : 'black' }}
                        onClick={() => handleClick(cat.searchTerm, cat.name)}
                    >
                        <span className='cat-icon p-2 text-red-400 font-bold'
                            style={{ color: selectedCat === cat.name ? 'white' : 'rgb(248 113 113)' }}
                        >{cat.icon}</span>
                        <span className='cat-name text-red-400 font-bold text-xl'
                            style={{ color: selectedCat === cat.name ? 'white' : 'rgb(248 113 113)' }}>{cat.name}</span>
                    </button>
                ))}
            </div>

            <div className='main bg-black p-4 '>
                <Typography variant='h4' sx={{ color: 'white', mb: '15px' }} >
                    <span style={{ marginRight: '10px' }}>{selectedCat}</span>
                    <span>Videos</span>
                </Typography>

                <VideoFeed videos={fetchedData} />
            </div>

        </div >
    )
}
