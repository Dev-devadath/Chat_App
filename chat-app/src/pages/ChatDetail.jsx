import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import image1 from '../assets/image_processing20220225-29217-hv4dvv.jpg'
import image2 from '../assets/image_processing20220305-7813-19y4c1j.jpg'
import image3 from '../assets/image_processing20220225-29217-hv4dvv.jpg'
import image4 from '../assets/more.png'
import closeIcon from '../assets/Vector.svg';
import { Link, useNavigate } from 'react-router-dom';

function ChatDetail() {
  const { data } = useContext(ChatContext);
  const userUid = data.user.uid;
  const navigate = useNavigate(); 

  const goBack = () => {
    navigate(-1); 
  };
  return (
    <div className="container">
      <img
        src={closeIcon}
        alt="Close"
        className="close-icon"
        onClick={goBack}
      />
      <h1>Contact Details</h1>
      <div className="user-profile">
        <img src={data.user.photoURL} alt="pfp" />
        <h2>{data.user.displayName}</h2>
        <h3>About</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
            Dolorem, similique? Maiores est dolorem suscipit quia laborum vitae odit iste <br/>
            fugiat officia dicta quas hic molestiae, cupiditate doloribus labore, quasi voluptas?
        </p>
      </div>
      <div className="media">
        <h2>Media</h2>
        <div className="image-grid">
          <img src={image1} alt="Image 1" />
          <img src={image2} alt="Image 2" />
          <img src={image3} alt="Image 3" />
          <img src={image4} alt="Image 4" />
        </div>
      </div>
    </div>
  );
}

export default ChatDetail;
