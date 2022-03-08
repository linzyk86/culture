import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import axios from "axios";


const Container = Styled.div`
display: flex;
flex-direction: column;
margin: 0 auto;

  
  img{
    margin: 0 auto;

    max-height: 300px;
    padding: 20px;
  }
  .imgContainer{
    max-width: 40%;
  }
  .buttons{
    margin: 0 20px 0 20px;
    display: flex;
    justify-content: space-around;

  button{  
    background: #6a5acd;
    outline: none;
    color: white;
    border-radius: 4px;
    outline: none;
    font-family: Helvetica;
  }
  }
`;

const Image = (url) => {
  const handleClick = (event, url) => {
    console.log('url', url, event.target.value)
    axios
    .post("/update", {url: url, tag: event.target.value})
    .then((res) => {
      console.log("res", res)
    })
    .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className='imgContainer'>
        <img src={`${url.url}`} />
      </div>
      <div className='buttons'>
        <button
        value='foaming'
         className='foaming' 
         onClick={(event)=>handleClick(event, url)}> 
         Foaming </button>

        <button 
        className='not_foaming' 
        value='not foaming'
        onClick={(event)=>handleClick(event, url)}>
           Not Foaming </button>
      </div>
    </Container>
  );
};
export default Image;
