// React
import { useState, useEffect } from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';
import Select from "react-select";
import Grid from "@mui/material/Grid";

//Nivo
import { ResponsiveBar } from "@nivo/bar";

//Data
import { tidy, pivotWider } from "@tidyjs/tidy";

//Options
import demographic_options from './options/demographic_options.json'
import department_options from './options/department_options.json'
import question_options from './options/question_options.json'
import survey_year_options from './options/survey_year_options.json'

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
    demographic: [
      { label: "Female gender", value: "Female gender" },
      { label: "Male gender", value: "Male gender" },
    ],
  });

  const [pivot, setPivot] = useState({
    label: "Demographic",
    value: "demographic",
  });
  const [axis, setAxis] = useState({ label: "Question", value: "question" });

  const pivotOptions = [
    {
      label: "Demographic",
      value: "demographic",
    },
    {
      label: "Survey Year",
      value: "survey_year",
    },
    {
      label: "Question",
      value: "question",
    },
    {
      label: "Department",
      value: "department",
    },
  ];

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
          score: obj.score,
        })),
        pivotWider({
          namesFrom: pivot.value,
          valuesFrom: "score",
        })
      )
    : filteredData;


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

  const handleDemographicChange = (event_array) => {
    console.log(event_array);
    setFilters((prevFilter) => ({
      ...prevFilter,
      demographic: event_array,
    }));
  };

  const handlePivotChange = (event_object) => {
    setPivot(event_object);
  };

  const handleAxisChange = (event_object) => {
    setAxis(event_object);
  };

  console.log(pivot);

  const padding = 0;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Candev - Data Analysis and Visualization
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Retention and mobilization of talent among employment equity groups
        </Typography>

        <Grid container spacing={1}>
          <Grid container item xs={2} alignSelf="center" padding={padding}>
            <Typography variant="p" component="p">
              Breakdown
            </Typography>
          </Grid>
          <Grid item xs={10} padding={padding}>
            <Select
              options={pivotOptions}
              value={pivot ? pivot : []}
              onChange={handlePivotChange}
            />
          </Grid>
          <Grid container item xs={2} alignSelf="center" padding={padding}>
            <Typography variant="p" component="p">
              X Axis
            </Typography>
          </Grid>
          <Grid item xs={10} padding={padding}>
            <Select
              options={pivotOptions}
              value={axis ? axis : []}
              onChange={handleAxisChange}
            />
          </Grid>
          <Grid container item xs={2} alignSelf="center" padding={padding}>
            <Typography variant="p" component="p">
              Survey Year
            </Typography>
          </Grid>
          <Grid item xs={10} padding={padding}>
            <Select
              isMulti
              options={survey_year_options}
              value={filters.survey_year}
              onChange={handleSurveyYearChange}
            />
          </Grid>
          <Grid container item xs={2} alignSelf="center" padding={padding}>
            <Typography variant="p" component="p">
              Question
            </Typography>
          </Grid>
          <Grid item xs={10} padding={padding}>
            <Select
              isMulti
              options={question_options}
              value={filters.question}
              onChange={handleQuestionChange}
            />
          </Grid>
          <Grid container item xs={2} alignSelf="center" padding={padding}>
            <Typography variant="p" component="p">
              Demographic
            </Typography>
          </Grid>
          <Grid item xs={10} padding={padding}>
            <Select
              isMulti
              options={demographic_options}
              value={filters.demographic}
              onChange={handleDemographicChange}
            />
          </Grid>
        </Grid>

        {data.length ===0 ? (
          <Box sx={{ width: '100%', marginTop:20 }}>
            <LinearProgress />
          </Box>
        ) : (
          <div style={{ height: 500, width: "100%" }}>
            <ResponsiveBar
              data={pivotDataGroup}
              keys={
                pivot ? filters[pivot.value].map((obj) => obj.value) : ["score"]
              }
              indexBy={axis.value}
              groupMode="grouped"
              margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
              padding={0.3}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-left",
                  direction: "column",
                  justify: false,
                  translateX: 0,
                  translateY: 100,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              tooltip={(point) => (
                <div style={{ maxWidth: 400, background: "white" }}>
                  <p>
                    {point.id}:{point.value}
                  </p>
                  <p>{point.data.demographic}</p>
                  {/* <pre>{JSON.stringify(point, null, 2)}</pre> */}
                </div>
              )}
            />
          </div>
        )}

        {/* <pre>{JSON.stringify(pivotDataGroup, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(filters, null, 2)}</pre> */}
      </Box>
    </Container>
  );
};

export default App;
