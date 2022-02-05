// React
import { useState, useEffect } from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

//Nivo
import { ResponsiveBar } from "@nivo/bar";


const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    survey_year: 2020,
    question:
      "Question 1. I have the tools, technology and equipment I need to do my job.",
    department: "Public Service",
  });

  useEffect(() => {
    setLoading(true);
    fetch('data/clean.json')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        setLoading(false)
      })
  }, []);

  const filteredData = data.filter(
    (point) =>
      point.survey_year === filters.survey_year &&
      point.question === filters.question &&
      point.department === filters.department
  );

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Candev - Data Analysis and Visualization
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Retention and mobilization of talent among employment equity groups
        </Typography>
        {loading && !data && <CircularProgress />}
        <div style={{ height: 200, width: "100%" }}>
          <ResponsiveBar
            data={filteredData}
            keys={["score"]}
            indexBy="demographic"
          />
        </div>

        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </Box>
    </Container>
  );
};

export default App;
