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

export default dataViewer