import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from './'
import { fetchFromAPI } from "../utils/fetchFromApI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos,setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?.part=snippet,statistics&id=${id}`)
     .then((data) => setVideoDetail(data.items[0]));

     fetchFromAPI(`search?part=snippet&relatedVideoId=${id}&type=video`)
     .then((data) => setVideos(data.items));
  }, [id]);

  if(!videoDetail?.snippet) return 'Loading...';

  const { snippet: {title, channelId, channelTitle}, statistics: { viewCount, likeCount}} =videoDetail;
  return (
    <Box minHeight ="95vh">
      <Stack direction={{xs:'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '75px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player" controls/>
            <Typography color="#fff" variant="h5" fontweight="bold" p={1}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{color: '#fff'}} py={0} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h3'}} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '15px', color: 'gray', ml:'9px'}} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant ="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant ="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={1} py={{md:1, xs:5}} justifyContent="center" alighnItems="center">
        <Videos videos={videos} direction="column" />

      </Box>
      </Stack>
    </Box>
  )
}




export default VideoDetail;