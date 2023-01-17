import { Avatar,useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState } from "react";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { storage } from "../../firebase";
import { auth } from "../../firebase";



const Settings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const userId = auth.currentUser.uid;
    const imageRef = ref(storage, 'users/'+userId+'/'+'image.png');

    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      <Avatar src={url} sx={{ width: 150, height: 150 }} />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}


export default Settings;