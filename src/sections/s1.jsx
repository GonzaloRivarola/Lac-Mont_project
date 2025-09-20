

import './sections.css'

const Section1 = () => {
  return (
    <div className="section1">
    <video
      src="https://res.cloudinary.com/duyofvkt2/video/upload/v1750440930/Sin_t%C3%ADtulo_mjnask.mp4"

      autoPlay
      muted
      loop
      playsInline
      className="video-loop"
    >
      Your browser does not support HTML5 videos.
    </video>
    </div>


  );
};


export default Section1;


