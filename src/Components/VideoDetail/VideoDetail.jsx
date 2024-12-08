import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import FetchFromApi from '../Utils/Fetch';
import './VideoDetail.css'



const VideoDetail = () => {
    const { id } = useParams();
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [comments, setComments] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [videoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        FetchFromApi(`https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`)
            .then((data3) => setVideoDetail(data3));
    }, [id]);

    useEffect(() => {
        FetchFromApi(`https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=50`)
            .then((data) => setRelatedVideos(data));
    }, [id]);

    useEffect(() => {
        FetchFromApi(`https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${id}&maxResults=100`)
            .then((data2) => setComments(data2));
    }, [id]);

    return (
        <div className="p-4 bg-black text-white videoDetail-container">
            {/* Video Player Section */}
            <div className="video ">
                <div className="bg-gray-900 rounded-md overflow-hidden shadow-lg w-full">
                    <ReactPlayer
                        url={`https://youtube.com/watch?v=${id}`}
                        controls
                        width="100%"
                        height="400px"
                    />
                    {videoDetail?.map((item3) => (
                        <div key={item3.id} className="p-4">
                            <h1 className="text-2xl font-semibold">{item3.snippet.title}</h1>
                            <div className="mt-2 flex justify-between items-center">
                                <h3 className="text-sm opacity-75">
                                    Views: {parseInt(item3.statistics.viewCount).toLocaleString()}
                                </h3>
                                <Link
                                    to={`/channel/${item3.snippet.channelId}`}
                                    className="text-sm bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600"
                                >
                                    {item3.snippet.channelTitle}
                                </Link>
                            </div>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="mt-4 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                {showDetails ? "Hide Details" : "Show Details"}
                            </button>
                            {showDetails && (
                                <div className="mt-4">
                                    <p className="text-sm opacity-75">
                                        Published on: {new Date(item3.snippet.publishedAt).toLocaleDateString()}
                                    </p>
                                    <p className="mt-2" dangerouslySetInnerHTML={{ __html: item3.snippet.description }}></p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Related Videos */}
            <div className="bg-gray-800 rounded-md shadow-lg p-4 suggestions">
                <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
                <div className="space-y-4 overflow-y-scroll">
                    {relatedVideos?.map((item) => (
                        <Link
                            to={`/video/${item.id.videoId}`}
                            key={item.id.videoId}
                            className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded-md"
                        >
                            <img
                                src={item.snippet.thumbnails.medium.url}
                                alt="video thumbnail"
                                className="w-20 h-12 object-cover rounded"
                                onError={(e) => (e.target.src = "/vite-project/public/business-vector-icon-quality-icon-mobile-web_720607-10963.jpg")}
                            />

                            <div>
                                <h3 className="text-sm font-medium line-clamp-2">{item.snippet.title}</h3>
                                <p className="text-xs text-gray-400">{item.snippet.channelTitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Comments Section */}
            <div className=" bg-gray-800 rounded-md shadow-lg p-4 comments ">
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                <div className="space-y-4 overflow-y-scroll h-[1120px]">
                    {comments?.map((item4) => (
                        <div
                            key={item4.id}
                            className="p-3 bg-gray-900 rounded-md flex gap-3 items-start"
                        >
                            <img
                                src={item4.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                alt="profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h3 className="text-sm font-medium">
                                    {item4.snippet.topLevelComment.snippet.authorDisplayName}
                                </h3>
                                <p className="text-xs text-gray-400">
                                    {new Date(item4.snippet.topLevelComment.snippet.publishedAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: item4.snippet.topLevelComment.snippet.textDisplay }}></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoDetail;
