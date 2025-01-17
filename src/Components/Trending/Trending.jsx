import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Trending = () => {
    const [trendingVideos, setTrendingVideos] = useState([]);
    
    function onClick(){
        window.scroll(0,0)
    }

    useEffect(() => {
        const url = 'https://youtube-v3-alternative.p.rapidapi.com/trending?geo=US&lang=en';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b75c0a32c6msh6618f633bd8a238p1ba9bcjsnc27476b9b70e',
                'x-rapidapi-host': 'youtube-v3-alternative.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTrendingVideos(data.data); // Assuming the data has an 'items' field
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // if (trendingVideos.length === 0) {
    //     return <h2 className="text-white text-center text-xl">Loading...</h2>;
    // }

    return (
        <>
<Typography variant="h4" align="center" sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}>
    Trending Videos
</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {trendingVideos?.map((item) => (
                <div
                    key={item.videoId}
                    className="flex flex-col bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                    {/* Thumbnail */}
                    <Link to={`/video/${item.videoId}`} className="block group" onClick={onClick}>
                        <div className="relative">
                            <img
                                className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
                                src={item.thumbnail[0].url} // Using the 'richThumbnail' URL
                                alt="video thumbnail"
                            />
                            {/* Play Icon on Hover */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    viewBox="0 0 24 24"
                                    className="w-12 h-12"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="p-3 flex-grow">
                            <h6 className="text-white font-semibold line-clamp-2">
                                {item.title}
                            </h6>
                        </div>
                    </Link>

                    {/* Channel Information */}
                    <div className="bg-[#323232] text-sm text-white p-3 ">
                        <Link
                            to={`/channel/${item.channelId}`}
                            className="flex items-center hover:text-red-400 hover:underline"
                        >
                            {/* Channel Icon */}
                            <img
                                className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0 mr-3"
                                src={item.channelThumbnail[0].url} // Using 'channelThumbnail' URL
                                alt="channel icon"
                            />
                            <span>{item.channelTitle}</span>
                        </Link>
                    </div>

                    {/* Video Info */}
                    <div className="bg-[#323232] text-sm text-white p-3">
                        <span>{item.lengthText}</span>
                        <span className="ml-4">{item.viewCount} views</span>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default Trending;
