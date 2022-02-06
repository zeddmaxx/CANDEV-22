library(tidyverse)

data <- read_csv('data/clean.csv')

male_gender_diverse <- data %>%
  select(!subindicator) %>%
  filter(demographic == 'Male gender'| demographic == "Gender diverse") %>%
  group_by(survey_year) %>%
  pivot_wider(names_from = "demographic", values_from = c(score, answer_count)) %>%
  mutate(difference = `score_Male gender` - `score_Gender diverse`) %>% 
  mutate(share = `answer_count_Gender diverse`/`answer_count_Male gender`) %>%
  mutate(mean_share = mean(share, na.rm = TRUE)) %>%
  mutate(share_difference = share/mean_share) %>%
  filter(survey_year == '2020') %>%
  filter(department == "Innovation, Science and Economic Development Canada")

male_female <- data %>%
  select(!subindicator) %>%
  filter(demographic == 'Male gender'| demographic == "Female gender") %>%
  group_by(survey_year) %>%
  pivot_wider(names_from = "demographic", values_from = c(score, answer_count)) %>%
  mutate(difference = `score_Male gender` - `score_Female gender`) %>% 
  mutate(share = `answer_count_Female gender`/`answer_count_Male gender`) %>%
  mutate(mean_share = mean(share, na.rm = TRUE)) %>%
  mutate(share_difference = share/mean_share) %>%
  filter(survey_year == '2020') %>%
  filter(department == "Innovation, Science and Economic Development Canada")

indigenous_non <- data %>%
  select(!subindicator) %>%
  filter(demographic == 'Indigenous'| demographic == "Non-Indigenous") %>%
  group_by(survey_year) %>%
  pivot_wider(names_from = "demographic", values_from = c(score, answer_count)) %>%
  mutate(difference = `score_Non-Indigenous` - `score_Indigenous`) %>% 
  mutate(share = `answer_count_Indigenous`/`answer_count_Non-Indigenous`) %>%
  mutate(mean_share = mean(share, na.rm = TRUE)) %>%
  mutate(share_difference = share/mean_share) %>%
  filter(survey_year == '2020') %>%
  filter(department == 'Innovation, Science and Economic Development Canada')


disability_non <- data %>%
  select(!subindicator) %>%
  filter(demographic == 'Person with a disability'| demographic == "Not a person with a disability") %>%
  group_by(survey_year) %>%
  pivot_wider(names_from = "demographic", values_from = c(score, answer_count)) %>%
  mutate(difference = `score_Not a person with a disability` - `score_Person with a disability`) %>% 
  mutate(share = `answer_count_Person with a disability`/`answer_count_Not a person with a disability`) %>%
  mutate(mean_share = mean(share, na.rm = TRUE)) %>%
  mutate(share_difference = share/mean_share) %>%
  filter(survey_year == '2020') %>%
  filter(department == 'Innovation, Science and Economic Development Canada')


disability_non <- data %>%
  select(!c(answer_count, subindicator)) %>%
  filter(demographic == 'Person with a disability'| demographic == "Not a person with a disability") %>%
  group_by(survey_year) %>%
  pivot_wider(names_from = "demographic", values_from = "score") %>%
  mutate(difference = `Person with a disability` - `Not a person with a disability`) %>% 
  filter(survey_year == '2020') 


