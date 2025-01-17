import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FetchFromApi from "../Utils/Fetch";
import { Link } from "react-router-dom";

const SearchFeed = () => {
    const { searchterm } = useParams();
    const [searchVideos, setSearchVideos] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b75c0a32c6msh6618f633bd8a238p1ba9bcjsnc27476b9b70e',
            'x-rapidapi-host': 'youtube-v3-alternative.p.rapidapi.com'
        }
    };

    useEffect(() => {
        // Ensure `searchterm` is available before fetching data
        if (searchterm) {
            console.log("Search term:", searchterm);
            fetch(`https://youtube-v3-alternative.p.rapidapi.com/search?query=${searchterm}&geo=US&lang=en`, options)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched data:", data); // Check the structure of the data
                    setSearchVideos(data.data); // Update the state with the correct data array
                });
        }
    }, [searchterm]);

    useEffect(() => {
        console.log("Updated searchVideos state:", searchVideos);
    }, [searchVideos]); // Runs when the state is updated

function onClick(){
    window.scroll(0,0)
}

    return (
        <div className="bg-black min-h-screen px-4 py-8">
            <h2 className="text-white text-2xl font-semibold mb-6">
                Search Results for: <span className="text-red-500">{searchterm}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {searchVideos?.map((item) => {
        if (item.type === "video") {
            // Design for videos
            return (
                <div
                    key={item.videoId}
                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                    <Link to={`/video/${item.videoId}`} onClick={onClick}>
                        <img
                            src={item.thumbnail[0]?.url}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                        />
                        <h3
                            dangerouslySetInnerHTML={{ __html: item.title }}
                            className="text-white text-lg font-medium p-4 line-clamp-2"
                        ></h3>
                    </Link>
                    <Link
                        to={`/channel/${item.channelId}`}
                        dangerouslySetInnerHTML={{ __html: item.channelTitle }}
                        onClick={onClick}
                        className="block text-red-400 text-sm font-medium px-4 pb-4 hover:underline"
                    />
                </div>
            );
        } else if (item.type === "channel") {
            // Design for channels
            return (
                <div
                    key={item.channelId}
                    className="bg-blue-900 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                    <Link to={`/channel/${item.channelId}`} onClick={onClick}>
                        <img
                            src={item.thumbnail[0]?.url}
                            alt={item.channelTitle}
                            className="w-24 h-24 mx-auto rounded-full mt-4"
                        />
                        <h3
                            dangerouslySetInnerHTML={{ __html: item.channelTitle }}
                            className="text-white text-lg font-medium text-center mt-4"
                        ></h3>
                        <p className="text-gray-400 text-sm text-center mt-2">
                            {item.subscriberCount || "No subscriber count available"}
                        </p>
                        {/* <p className="text-gray-300 text-sm text-center px-4 mt-2">
                            {item.description || "No description available"}
                        </p> */}
                    </Link>
                </div>
            );
        }
        return null; // Fallback if neither type matches
    })}
</div>


            </div>
    )
};

export default SearchFeed;
