// React
import { useState, useEffect } from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";

//Nivo
import { ResponsiveBar } from "@nivo/bar";

//Data
import groupBy from "json-groupby";
import { tidy, pivotWider, filter } from "@tidyjs/tidy";

const App = () => {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    survey_year: [{ label: "2020", value: 2020 }],
    question: [
      {
        label:
          "Question 1. I have the tools, technology and equipment I need to do my job.",
        value:
          "Question 1. I have the tools, technology and equipment I need to do my job.",
      },
    ],
    department: [{ label: "Public Service", value: "Public Service" }],
    demographic: [{label: 'Female gender', value: 'Female gender'},
                  {label: 'Male gender', value: 'Male gender'}]
  });

  const [pivot, setPivot] = useState();

  useEffect(() => {
    fetch("data/clean.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredData = data.filter(
    (point) =>
      filters.survey_year.map((obj) => obj.value).includes(point.survey_year) &&
      filters.question.map((obj) => obj.value).includes(point.question) &&
      filters.department.map((obj) => obj.value).includes(point.department) &&
      filters.demographic.map((obj) => obj.value).includes(point.demographic)
  );


  const pivotDataGroup = pivot
    ? tidy(
        filteredData.map((obj) => ({
          survey_year: obj.survey_year,
          demographic: obj.demographic,
          question: obj.question,
          department: obj.department,
          score:obj.score
        })),
        pivotWider({
          namesFrom: pivot.value,
          valuesFrom: "score",
        })
      )
    : filteredData;

  const survey_year_options = [
    { value: 2020, label: "2020" },
    { value: 2019, label: "2019" },
    { value: 2018, label: "2018" },
  ];

  const question_options = [
    {
      value:
        "Question 1. I have the tools, technology and equipment I need to do my job.",
      label:
        "Question 1. I have the tools, technology and equipment I need to do my job.",
    },
    {
      value:
        "Question 2. The material and tools provided for my work, including software and other automated tools, are available in the official language of my choice.",
      label:
        "Question 2. The material and tools provided for my work, including software and other automated tools, are available in the official language of my choice.",
    },
  ];

  const handleSurveyYearChange = (event_array) => {
    console.log(event_array);
    setFilters((prevFilter) => ({
      ...prevFilter,
      survey_year: event_array,
    }));
  };

  const handleQuestionChange = (event_array) => {
    console.log(event_array);
    setFilters((prevFilter) => ({
      ...prevFilter,
      question: event_array,
    }));
  };

  const handlePivotChange = (event_object) => {
    setPivot(event_object)
  }

  console.log(pivot)

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Candev - Data Analysis and Visualization
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Retention and mobilization of talent among employment equity groups
        </Typography>
        {data.length === 0 && <CircularProgress />}
        <Select
          options={Object.keys(filters).map(filter => ({label:filter, value:filter}))}
          value={pivot ? pivot : []}
          onChange={handlePivotChange}
        />
        <Select
          isMulti
          options={survey_year_options}
          value={filters.survey_year}
          onChange={handleSurveyYearChange}
        />
        <Select
          isMulti
          options={question_options}
          value={filters.question}
          onChange={handleQuestionChange}
        />
        <div style={{ height: 200, width: "100%" }}>
          <ResponsiveBar
            data={pivotDataGroup}
            keys={pivot ? filters[pivot.value].map((obj) => obj.value) : ["score"]}
            indexBy="demographic"
            groupMode='grouped'
            tooltip = {(point) => (
              <div
                style={{maxWidth:400, background:'white'}}>
                  <p>{point.id}:{point.value}</p>
                  <p>{point.data.demographic}</p>
                  {/* <pre>{JSON.stringify(point, null, 2)}</pre> */}
              </div>
            )}
          />
        </div>
        {/* <pre>{JSON.stringify(pivotDataGroup, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(filters, null, 2)}</pre> */}
      </Box>
    </Container>
  );
};

export default App;
