// React
import { useState, useEffect } from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Select from "react-select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//Nivo
import { ResponsiveBar } from "@nivo/bar";

//Data
import { tidy, pivotWider } from "@tidyjs/tidy";

//Options
import demographic_options from "./options/demographic_options.json";
import department_options from "./options/department_options.json";
import question_options from "./options/question_options.json";
import survey_year_options from "./options/survey_year_options.json";
import pivot_options from "./options/pivot_options.json";

//Viewers
import pageViewer from "./viewer/pageViewer";
import dataViewer from "./viewer/dataViewer";

const App = () => {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState(dataViewer(99));

  const [pivot, setPivot] = useState({
    label: "Demographic",
    value: "demographic",
  });
  const [axis, setAxis] = useState({ label: "Question", value: "question" });

  const [page, setPage] = useState(99);

  useEffect(() => {
    setFilters(dataViewer(page));
  }, [page]);

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

  const filteredData =
    filters &&
    data.filter(
      (point) =>
        filters.survey_year
          .map((obj) => obj.value)
          .includes(point.survey_year) &&
        filters.question.map((obj) => obj.value).includes(point.question) &&
        filters.department.map((obj) => obj.value).includes(point.department) &&
        filters.demographic.map((obj) => obj.value).includes(point.demographic)
    );

  const pivotDataGroup =
    filters && pivot
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
    setFilters((prevFilter) => ({
      ...prevFilter,
      survey_year: event_array,
    }));
  };

  const handleQuestionChange = (event_array) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      question: event_array,
    }));
  };

  const handleDemographicChange = (event_array) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      demographic: event_array,
    }));
  };

  const handleDepartmentChange = (event_array) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      department: event_array,
    }));
  };

  const handlePivotChange = (event_object) => {
    setPivot(event_object);
  };

  const handleAxisChange = (event_object) => {
    setAxis(event_object);
  };

  const handleBegin = () => {
    setPage(1);
  };

  const handleDashboard = () => {
    setPage(0);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const padding = 0;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Public Service Employee Survey Exploration
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Data and Analysis Tool for the Retention and mobilization of talent
          among employment equity groups
        </Typography>
        <Typography variant="p" component="p" style={{ marginBottom: 20 }}>
          Welcome to the Public Service Employee Survey Exploration Data and
          Analysis Tool for the Retention and mobilization of talent among
          employment equity groups. This is a tool for you to explore answers
          from members of the Public Service. This dataset in particular is
          focused on Equity and Diversity. We go through a visual essay of some
          of our findings to show the largest gaps between Employment Equity
          group members and non-Employment Equity group members within ISED. 
          You can take a look at the technical details of our findings <a href="https://htmlpreview.github.io/?https://github.com/zeddmaxx/CANDEV-22/blob/main/analysis/ISED_cultural_analysis.html" target="_blank" rel="noreferrer">here</a>
          &nbsp;and <a href="https://htmlpreview.github.io/?https://github.com/zeddmaxx/CANDEV-22/blob/main/analysis/Gender_gap.html" target="_blank" rel="noreferrer">here</a>&nbsp; You
          can also go through straight to our interactive dashboard to explore
          yourself!
        </Typography>
        {(page === 99 || page === 0) && (
          <Button
            variant="text"
            style={{ marginRight: 5, color: "gray" }}
            onClick={handleBegin}
          >
            Start Visual Essay
          </Button>
        )}
        {page !== 0 && (
          <Button variant="text" onClick={handleDashboard}>
            Go to Dashboard
          </Button>
        )}

        {pageViewer(page)}
        {page === 0 && (
          <Grid container spacing={1}>
            <Grid container item xs={2} alignSelf="center" padding={padding}>
              <Typography variant="p" component="p">
                Breakdown
              </Typography>
            </Grid>
            <Grid item xs={10} padding={padding}>
              <Select
                options={pivot_options}
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
                options={pivot_options}
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
                value={filters && filters.survey_year}
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
                value={filters && filters.question}
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
                value={filters && filters.demographic}
                onChange={handleDemographicChange}
              />
            </Grid>
            <Grid container item xs={2} alignSelf="center" padding={padding}>
              <Typography variant="p" component="p">
                Department
              </Typography>
            </Grid>
            <Grid item xs={10} padding={padding}>
              <Select
                isMulti
                options={department_options}
                value={filters && filters.department}
                onChange={handleDepartmentChange}
              />
            </Grid>
          </Grid>
        )}
        {data.length === 0 ? (
          <Box sx={{ width: "100%", marginTop: 20 }}>
            <LinearProgress />
          </Box>
        ) : page !== 99 ? (
          <div style={{ height: 500, width: "100%" }}>
            <ResponsiveBar
              data={filters ? pivotDataGroup : []}
              keys={
                pivot && filters
                  ? filters[pivot.value].map((obj) => obj.value)
                  : ["score"]
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
        ) : null}
        {page !== 99 && page !== 0 && (
          <div style={{display:'flex', justifyContent:'space-between'}}>
            {page !== 1 ? (
              <Button
                variant="text"
                style={{ marginTop: 20, marginRight: 20, color: "gray" }}
                onClick={handlePreviousPage}
              >
                Previous Page
              </Button>
            ):<div></div>}
            {page !==3 &&
              <Button
                variant="text"
                style={{ marginTop: 20, color: "gray" }}
                onClick={handleNextPage}
              >
                Next Page
              </Button>
            }
          </div>
        )}
        {/* <pre>{JSON.stringify(pivotDataGroup, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(filters, null, 2)}</pre> */}
      </Box>
    </Container>
  );
};

export default App;
