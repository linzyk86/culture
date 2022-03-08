import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";
import Styled from "styled-components";

const Container = Styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

function App() {
  const [data, setData] = useState();
  const [search, setSearch] = useState()
  const object_key =
    "prod-exp13436-2020-01-08-at-04.24.38-9zijoye9dteugy6agooo506u3c6wrin920a99mavvv4z9mahkt7qbu6thl2l3v39.png";

  // useEffect(() => {
  //   //imageUrls.forEach((url) => {
  //   axios
  //     .post("http://localhost:3001/images", {
  //       imageUrls:imageUrls,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  //   //});
  // }, []);

  useEffect(() => {
    axios
      .get("/images")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value)
  };

  return (
    <div className="App">
      <h1>Culture</h1>
      <input placeholder="Search" onChange={(event)=>handleChange(event)}></input>
      {data && (
        <Container>
          {data
            .filter((val) => {
              console.log(val, search);
              if (!search && val.tag === null) {
                return val;
              } else if (val?.tag?.toLowerCase() === search) {
                return val;
             }
            })
            .map((item) => {
              return <Image url={item.url} />;
            })}
        </Container>
      )}
    </div>
  );
}

export default App;
