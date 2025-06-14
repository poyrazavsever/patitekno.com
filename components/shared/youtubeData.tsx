"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";

type VideoItem = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
};

const YoutubeData = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID!;
  const maxResults = 2;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
        );
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Video çekilemedi:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video) => {
        const videoId = video.id.videoId;
        return (

          <div key={videoId} className="border border-neutral-300 dark:border-neutral-600 p-2 rounded-md">
            <iframe
              className="w-full aspect-video rounded-md"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={video.snippet.title}
              allowFullScreen
            />
            <h3 className="mt-2 font-semibold text-lg text-primary dark:text-primaryDark">{video.snippet.title}</h3>
            <p className="text-sm text-textColor dark:text-textColorDark line-clamp-3">{video.snippet.description}</p>
          </div>

        );
      })}
    </div>
  );
};

export default YoutubeData;
