/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const VideoFeed = ({ videos }) => {
    if (videos.length === 0) {
        return <h2 className="text-white text-center text-xl">Loading...</h2>;
    }

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {videos.map((item) => (
                <div 
                    key={item.id.videoId} 
                    className="group relative w-64 bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                >
                    {/* Thumbnail */}
                    <Link to={`/video/${item.id.videoId}`} className="block">
                        <img
                            className="w-full h-40 object-cover"
                            src={item.snippet.thumbnails.medium.url}
                            alt="video thumbnail"
                        />
                        {/* Gradient overlay for title */}
                        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent text-white text-sm">
                            <h6
                                className="font-semibold line-clamp-2"
                                dangerouslySetInnerHTML={{
                                    __html: item.snippet.title.slice(0, 70) + 
                                    (item.snippet.title.length > 70 ? '...' : '')
                                }}
                            />
                        </div>
                    </Link>
                    
                    {/* Channel link */}
                    <Link
                        to={`/channel/${item.snippet.channelId}`}
                        className="block px-3 py-2 bg-[#323232] text-sm text-white hover:text-red-500 hover:underline"
                    >
                        {item.snippet.channelTitle}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default VideoFeed;
