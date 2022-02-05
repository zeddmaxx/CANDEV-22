// React
import { useState, useEffect } from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

//Firebase
import app from "./utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getDownloadURL(ref(storage, "clean.json")).then((url) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.slice(0,10))
          setData(data);
          setLoading(false)
        })
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    })
  }, []);


  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Candev - Data Analysis and Visualization
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Retention and mobilization of talent among employment equity groups
        </Typography>
        {
          loading &&
          <CircularProgress />
        }
        {
          data &&
            <pre>{JSON.stringify(data.slice(0,10), null, 2)}</pre>
        }
      </Box>
    </Container>
  );
};

export default App;
