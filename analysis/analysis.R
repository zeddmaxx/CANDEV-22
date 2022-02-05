library(tidyverse)

data <- read_csv('data/clean.csv')

analysis <- data %>%
  select(!c(answer_count, subindicator)) %>%
  filter(demographic == 'Male gender'| demographic == "Gender diverse") %>%
  group_by(survey_year) %>%
  pivot_wider(names_from = "demographic", values_from = "score") %>%
  mutate(difference = `Male gender` - `Gender diverse`)
  
  