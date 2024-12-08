import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchFromApi from '../Utils/Fetch';
import { Link } from 'react-router-dom';

const ChannelDetail = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);

  useEffect(() => {
    FetchFromApi(`https://youtube-v31.p.rapidapi.com/search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50`)
      .then((res) => {
        setChannelVideos(res);
      });
  }, [id]);

  useEffect(() => {
    FetchFromApi(`https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${id}`)
      .then((data) => setChannel(data));
  }, [id]);

  return (
    <div className="bg-black min-h-screen">
      {/* Channel Header Section */}
      <div className="bg-gray-800 py-12">
        {channel.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center text-center gap-4 max-w-4xl mx-auto"
          >
            <img
              src={
                item.snippet.thumbnails.default.url ||
                '/Youtube_Clone/src/assets/blank-profile-picture-973460_640.png'
              }
              alt="channel logo"
              className="w-32 h-32 rounded-full shadow-lg"
            />
            <h3
              className="text-3xl font-bold text-white"
              dangerouslySetInnerHTML={{ __html: item.snippet.title }}
            ></h3>
            <div className="flex gap-8 text-gray-300">
              <h3 className="text-lg">
                Subscribers: {parseInt(item.statistics.subscriberCount).toLocaleString()}
              </h3>
              <h3 className="text-lg">
                Views: {parseInt(item.statistics.viewCount).toLocaleString()}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Videos Section */}
      <div className="px-4 py-8">
        <h3 className="text-white text-2xl font-semibold mb-6">Channel Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {channelVideos &&
            channelVideos.map((item) => (
              <Link
                to={`/video/${item.id.videoId}`}
                key={item.id.videoId}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.snippet.thumbnails.high.url}
                  alt={item.snippet.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3
                    className="text-white text-lg font-medium line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.snippet.title }}
                  ></h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelDetail;
