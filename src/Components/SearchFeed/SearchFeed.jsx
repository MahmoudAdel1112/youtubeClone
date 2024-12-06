import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FetchFromApi from "../Utils/Fetch";
import { Link } from "react-router-dom";

const SearchFeed = () => {
    const { searchterm } = useParams();
    const [searchVideos, setSearchVideos] = useState([]);

    useEffect(() => {
        FetchFromApi(
            `https://youtube-v31.p.rapidapi.com/search?q=${searchterm}&part=snippet%2Cid&regionCode=US&maxResults=50`
        ).then((res) => {
            setSearchVideos(res);
        });
    }, [searchterm]);

    return (
        <div className="bg-black min-h-screen px-4 py-8">
            <h2 className="text-white text-2xl font-semibold mb-6">
                Search Results for: <span className="text-red-500">{searchterm}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchVideos?.map((item) => (
                    <div key={item.id.videoId} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <Link to={`/video/${item.id.videoId}`}>
                            <img
                                src={item.snippet.thumbnails.high.url}
                                alt={item.snippet.title}
                                className="w-full h-48 object-cover"
                            />
                            <h3
                                dangerouslySetInnerHTML={{ __html: item.snippet.title }}
                                className="text-white text-lg font-medium p-4 line-clamp-2"
                            ></h3>
                        </Link>
                        <Link
                            to={`/channel/${item.snippet.channelId}`}
                            dangerouslySetInnerHTML={{ __html: item.snippet.channelTitle }}
                            className="block text-red-400 text-sm font-medium px-4 pb-4 hover:underline"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchFeed;
