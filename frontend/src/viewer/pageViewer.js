import Typography from "@mui/material/Typography";

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
            We found that the biggest differences between female and male
            genders is to questions regarding actions taken after discrimination
            or harassment were experienced. Those identifying with the female
            gender were much more likely to answer that they took no action
            against discrimination or harassment than those identifying with the
            male gender.
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
            Person with a Disability and Not a Person with a Disability
            Comparisons within ISED
          </Typography>
          <Typography variant="p" component="p" style={{ marginTop: 20 }}>
            We found that the largest differences between Persons with a
            disability and not a persons with a disability is to questions
            regarding harassment in the form of interference or withholding
            resources and discrimination from other departments or agencies.
          </Typography>
        </div>
      );
    case 3:
      return (
        <div>
          <Typography
            variant="h5"
            component="h5"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
           Visible Minority and Non-visible Minority
            Comparisons within ISED
          </Typography>
          <Typography variant="p" component="p" style={{ marginTop: 20 }}>
            We found that the largest differences between Visibile Minorities and Non-visibile minorities is that they are
            less comfortable sharing concerns with their managers. 
          </Typography>
        </div>
      );
    default:
      return (null)
  }
};

export default pageViewer;
