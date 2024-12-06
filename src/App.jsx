import { BrowserRouter, Route, Routes } from 'react-router-dom'  
import { Feed } from './Components/feed/Feed'
import { Navbar } from './Components/Navbar/Navbar'
import  VideoDetail  from './Components/VideoDetail/VideoDetail'
import ChannelDetail from './Components/ChannelDetail/ChannelDetail'
import SearchFeed from './Components/SearchFeed/SearchFeed'
import ErrorPage from './Components/ErrorPage'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Feed />}/>
        <Route path='/video/:id' element={<VideoDetail />}/>
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchterm' element={<SearchFeed />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App