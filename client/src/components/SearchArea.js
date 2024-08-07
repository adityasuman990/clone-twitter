
import Usercard from "./Usercard";
// const axios = require("axios");

// function SearchArea() {
//   const [text, setText] = useState("");
//   const [users, setUsers] = useState([]); 
//   const handleChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const req = await fetch(`${e.target.action}`, {
//       headers: {
//         "x-access-token": localStorage.getItem("token"),
//       },
//     });

//     const data = await req.json();
//     if (data.status === "ok") {
//       setUsers(data.users);
//     } else console.log(data.error);
//   };

//   return (
//     <div className="HeaderAndFeed">
//       <form
//         className="search-form"
//         onSubmit={handleSubmit}
//         method="GET"
//         action={`http://localhost:5000/search/${text}`}
//       >
//         <input
//           autoFocus
//           placeholder="Search users..."
//           value={text}
//           onChange={handleChange}
//         ></input>
//         <button type="submit" className="tweetBtn">
//           Search
//         </button>
//       </form>
//       <div className="allUsers">
//         {users.length === 0 ? (
//           <h1 className="noUserFound">No user found </h1>
//         ) : (
//           users.map((user) => {
//             return (
//               <Usercard
//                 avatar={user.avatar}
//                 username={user.username}
//                 followers={user.followers}
//               />
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchArea;

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const SearchArea = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for managing the search input
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (query) => {
    const url = `https://twitter154.p.rapidapi.com/search/search/continuation?query=%23${query}&section=top&min_retweets=20&limit=5&continuation_token=DAACCgACF_Sz76EAJxAKAAMX9LPvoP_Y8AgABAAAAAILAAUAAABQRW1QQzZ3QUFBZlEvZ0dKTjB2R3AvQUFBQUFVWDlJWmx4cHZBZkJmMG5RNUxHdUVQRi9TdTZPSGJzQ0VYOUp6Y3psdUJ3UmYwbFE3Q1dxQWsIAAYAAAAACAAHAAAAAAwACAoAARf0hmXGm8B8AAAA&min_likes=20&start_date=2022-01-01&language=en`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '4f83137143msh3f6247df341532dp14ff1bjsn7e8bd78eae59',
        'x-rapidapi-host': 'twitter154.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await axios.get(url, options);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchData(searchTerm); // Fetch data when searchTerm is not empty
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4" style={{marginLeft:"200px"}}>
      <h1 className="mb-4" style={{ fontSize: '2rem' }}>Twitter Data</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="row">
        {data && data.results && data.results.map((tweet, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card" style={{ height: "100%" }}>
              <div className="card-body">
                <h5 className="card-title">{tweet.user.name} <small className="text-muted">@{tweet.user.username}</small></h5>
                <h6 className="card-subtitle mb-2 text-muted">Created on: {new Date(tweet.creation_date).toLocaleDateString()}</h6>
                <p className="card-text">{tweet.text}</p>
                {tweet.media_url.length > 0 && (
                  <div className="mb-2">
                    {tweet.media_url.map((url, mediaIndex) => (
                      <img key={mediaIndex} src={url} alt={`Media ${mediaIndex}`} className="img-fluid mb-2" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                    ))}
                  </div>
                )}
                <div className="mb-3">
                  <div className="d-flex flex-wrap">
                    <div className="d-flex align-items-center me-3 mb-2">
                      <p className="mb-0"><strong>Favorites:</strong> {tweet.favorite_count}</p>
                    </div>
                    <div className="d-flex align-items-center me-3 mb-2">
                      <p className="mb-0"><strong>Retweets:</strong> {tweet.retweet_count}</p>
                    </div>
                    <div className="d-flex align-items-center me-3 mb-2">
                      <p className="mb-0"><strong>Replies:</strong> {tweet.reply_count}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <p className="mb-0"><strong>Views:</strong> {tweet.views}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <p><strong>User Bio:</strong> {tweet.user.description}</p>
                  <p><strong>Location:</strong> {tweet.user.location}</p>
                  <p><strong>Followers:</strong> {tweet.user.follower_count}</p>
                  <p><strong>Following:</strong> {tweet.user.following_count}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchArea.propTypes = {
  searchTerm: PropTypes.string, // Not required anymore, as it's managed internally
};

export default SearchArea;
