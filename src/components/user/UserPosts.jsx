import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import { PostAddSharp } from "@mui/icons-material";
import ShowPost from "../ShowPost";
import { Routes, Route, useParams } from "react-router-dom";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
import axios from "axios";
import { useEffect } from "react";
export default function QuiltedImageList(props) {
  const [itemData, setitemData] = useState([]);
  let { userId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`https://socialme-68rw.onrender.com/api/posts/${props.userId}`);
      // console.log(res.data);

      setitemData([...itemData, ...res.data]);
    };

    fetchPosts();
  }, []);
  const [partimg, setpartimg] = useState(false);
  const [partimgid, setpartimgid] = useState("");
  const [Fimg, setFimg] = useState("");
  const [isLiked, setisLiked] = useState(false);
  return (
    <ImageList
      sx={{
        width: "100%",
        height: "100%",
        flexWrap: "wrap",
        gap: "1rem",
        boxShadow: "1",
        padding: "1rem",
      }}
      variant="quilted"
      cols={4}
      rowHeight={121}
      flex={2}
    >
      {partimg && (
        <ShowPost
          partimgid={partimgid}
          setpartimg={setpartimg}
          isLiked={isLiked}
          Fimg={Fimg}
          setIsLiked={setisLiked}
        />
      )}
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            onClick={() => {
              // console.log(item);
              setpartimg(true);
              setpartimgid(item._id);
              setFimg(item.img);
              // console.log(item.img)
              item.likes.map(() => {
                if (item.userId === localStorage.getItem("userID")) {
                  setisLiked(true);
                }
              });
            }}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
// {
//   img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//   title: "Breakfast",
//   rows: 2,
//   cols: 2,
// },
// {
//   img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//   title: "Burger",
// },
// {
//   img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//   title: "Camera",
// },
// {
//   img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//   title: "Coffee",
//   cols: 2,
// },
// {
//   img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//   title: "Hats",
//   cols: 2,
// },
// {
//   img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//   title: "Honey",
//   author: "@arwinneil",
//   rows: 2,
//   cols: 2,
// },
// {
//   img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//   title: "Basketball",
// },
// {
//   img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//   title: "Fern",
// },
// {
//   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//   title: "Mushrooms",
//   rows: 2,
//   cols: 2,
// },
// {
//   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//   title: "Tomato basil",
// },
// {
//   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//   title: "Sea star",
// },
// {
//   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//   title: "Bike",
//   cols: 2,
// },
