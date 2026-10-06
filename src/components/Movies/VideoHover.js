import React from "react";
import YoutubeEmbed from "../common/YoutubeEmbed";
import Image from "../common/Image";
import { useFetch } from "../../hooks/useFetch";
import { API_KEY, DETAILS_API } from "../../utils/utils";

const VideoHover = ({ videoId, fallbackSrc }) => {
  const { data: videos } = useFetch(
    videoId ? `${DETAILS_API}/movie/${videoId}/videos${API_KEY}` : null
  );

  const trailerKey = videos?.results?.[0]?.key;

  if (!trailerKey) {
    return <Image src={fallbackSrc} />;
  }

  return <YoutubeEmbed embedId={trailerKey} />;
};

export default VideoHover;
