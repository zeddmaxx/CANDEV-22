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

const pageViewer = (page) => {
  switch (page) {
    case 1:
      return (
        <div>
          <Typography
            variant="h5"
            component="h5"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            Male and Female Gender Comparisons within ISED
          </Typography>
          <Typography variant="p" component="p" style={{ marginTop: 20 }}>
            We found that the biggest differences between female and male genders is to questions regarding actions taken after discrimination
            or harassment were experienced. Those identifying with the female gender were much more likely to answer that they took no action against
            discrimination or harassment than those identifying with the male gender. 
          </Typography>
        </div>
      );
    case 2:
      return (
        <div>
          <Typography
            variant="h5"
            component="h5"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            Person with a Disability and Not a Person with a Disability Comparisons within ISED
          </Typography>
          <Typography variant="p" component="p" style={{ marginTop: 20 }}>
            We found that
          </Typography>
        </div>
      );
  }
};

const dataViewer = (page) => {
  switch (page) {
    case 0:
      return {
        survey_year: [{ label: "2020", value: 2020 }],
        question: [
          {
            label:
              "Question 65i. What action(s) did you take to address the discrimination you experienced? I took no action.",
            value:
              "Question 65i. What action(s) did you take to address the discrimination you experienced? I took no action.",
          },
        ],
        department: [
          {
            label: "Innovation, Science and Economic Development Canada",
            value: "Innovation, Science and Economic Development Canada",
          },
        ],
        demographic: [
          { label: "Female gender", value: "Female gender" },
          { label: "Gender diverse", value: "Gender diverse" },
        ],
      };
    case 1:
      return {
        survey_year: [{ label: "2020", value: 2020 }],
        question: [
          {
            label:
              "Question 65i. What action(s) did you take to address the discrimination you experienced? I took no action.",
            value:
              "Question 65i. What action(s) did you take to address the discrimination you experienced? I took no action.",
          },
          {
            label:
              "Question 58i. What action(s) did you take to address the harassment you experienced? I took no action.",
            value:
              "Question 58i. What action(s) did you take to address the harassment you experienced? I took no action.",
          },
        ],
        department: [
          {
            label: "Innovation, Science and Economic Development Canada",
            value: "Innovation, Science and Economic Development Canada",
          },
        ],
        demographic: [
          { label: "Male gender", value: "Male gender" },
          { label: "Female gender", value: "Female gender" },
        ],
      };
      case 2:
      return {
        survey_year: [{ label: "2020", value: 2020 }],
        question: [
          {
            label:
              "Question 57e. Please indicate the nature of the harassment you experienced. Interference with work or withholding resources",
            value:
              "Question 57e. Please indicate the nature of the harassment you experienced. Interference with work or withholding resources",
          },
          {
            label:
              "Question 63e. From whom did you experience discrimination on the job? Individuals from other departments or agencies",
            value:
              "Question 63e. From whom did you experience discrimination on the job? Individuals from other departments or agencies",
          },
        ],
        department: [
          {
            label: "Innovation, Science and Economic Development Canada",
            value: "Innovation, Science and Economic Development Canada",
          },
        ],
        demographic: [
          { label: "Person with a disability", value: "Person with a disability" },
          { label: "Not a person with a disability", value: "Not a person with a disability" },
        ],
      };
    case 99:
      return {
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
          { label: "Gender diverse", value: "Gender diverse" },
        ],
      };
  }
};

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

  const [page, setPage] = useState(99);

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
    setPage(prevPage => (
      prevPage + 1
    )
    )
  }

  const handlePreviousPage = () => {
    setPage(prevPage => (
      prevPage - 1
    )
    )
  }

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
          group members and non-Employment Equity group members within ISED. You
          can also go through straight to our interactive dashboard to explore
          yourself!
        </Typography>
        {(page === 99 || page === 0) && (
          <Button
            variant="contained"
            style={{ marginRight: 5 }}
            onClick={handleBegin}
          >
            Start Visual Essay
          </Button>
        )}
        {page !== 0 && (
          <Button variant="contained" onClick={handleDashboard}>
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
          <div>
          {
            page !==1 &&
            <Button
              variant="contained"
              style={{ marginTop: 20, marginRight: 20 }}
              onClick={handlePreviousPage}
            >
              Previous Page
            </Button>
          }
          
            
            <Button variant="contained" style={{ marginTop: 20 }}
              onClick={handleNextPage}>
              Next Page
            </Button>
          </div>
        )}
        {/* <pre>{JSON.stringify(pivotDataGroup, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(filters, null, 2)}</pre> */}
      </Box>
    </Container>
  );
};

export default App;
