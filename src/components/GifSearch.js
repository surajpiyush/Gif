import { useState,useEffect } from "react";
import './GifSearch.css';

const GifSearch = () => {
  const GIPHY_API =
    "https://api.giphy.com/v1/gifs/search?api_key=5DRcWu2b2Y0E8SXtMOk2PH3ms0QfINwz&limit=10&offset=0&q=";

  let [search, setSearch] = useState("");
  let [gifs, setGifs] = useState([]);
  let [loadingState, setLoadingState] = useState(false);
  let [tren,setTren]=useState([])

  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=5DRcWu2b2Y0E8SXtMOk2PH3ms0QfINwz"
    )
      .then((res) => res.json())
      .then((data) => setTren(data.data)).catch((err)=>console.log(err))
    },[]);

console.log(  "pop",tren)


  
  let searchGif = () => {
    if (search.length > 0) {
      setLoadingState(true);
      fetch(GIPHY_API + search)
        .then((res) => {
          setLoadingState(false);
          return res.json();
        })
        .then((result) => {
          console.log(result);
          setGifs(
            result.data.map((gif) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch(() => {
          alert("Something went wrong");
          setLoadingState(false);
        });
    }
  };
  return (
    <div className="mycontainer" >
      <div className="header">
       
          <input
         className="mytext-input"
            type="text"
            placeholder="Search GIF"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchGif} className='btn'>Search</button>
        
      </div>
  
      <div className="result">
        {search.length<1 ? (
          <div className="loading">

<div className="item">
      {tren.map((item,i) => {
              return (
                <div  key={i}>
                  <img src={item.images.downsized
.url} alt="pic" width={200} height={200} />
                </div>
              );
            })}</div>
           
         
            <div className="loader"></div>
          </div>
        ) : (
          <div className="list">
            {gifs.map((gif,i) => {
              return (
                <div className="items" key={i}>
                  <img src={gif} alt="pic" />
                </div>
            );
            })}
          </div>
          )}
               
      </div>
    </div>
  );
};

export default GifSearch;
