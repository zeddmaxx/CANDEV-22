import pandas as pd
import json

raw_data = pd.read_csv('data/subset3.csv', encoding_errors='replace')

inter_data = raw_data[['SURVEYR', 
                       'BYCOND',
                       'DESCRIP_E',
                       'DEMCODE',
                       'TITLE_E',
                       'SCORE100',
                       'AGREE',
                       'ANSCOUNT',
                       'SUBINDICATORENG',
                       'DEPT_E']]


def clean_score(score):
    if score == '9999':
        return None
    else:
        return score

inter_data['SCORE100'] = inter_data['SCORE100'].map(lambda score: clean_score(score))
inter_data['AGREE'] = inter_data['AGREE'].map(lambda score: clean_score(score))

def global_score(row):
    if row['AGREE'] is None and row['SCORE100'] is not None:
        return row['SCORE100']
    if row['SCORE100'] is None and row['AGREE'] is not None:
        return row['AGREE']
    if row['SCORE100'] is not None and row['AGREE'] is not None:
        return row['SCORE100']
    return 'error'


inter_data['score'] = inter_data.apply(lambda row: global_score(row), axis=1)

inter_data['score'] = pd.to_numeric(inter_data['score'], errors='coerce')

inter_data = inter_data.loc[inter_data['TITLE_E'] != 'Question 54. Please indicate your reason for leaving.']

inter_data = inter_data.rename(columns={'SURVEYR':'survey_year', 'DESCRIP_E': 'demographic', 'TITLE_E': 'question', 'ANSCOUNT': 'answer_count', 'SUBINDICATORENG':'subindicator', 'DEPT_E': 'department'})

inter_data = inter_data.drop(columns=['BYCOND', 'DEMCODE', 'SCORE100', 'AGREE'])


final_data = inter_data


final_data.to_json('data/clean.json', orient='records')


survey_year_options = []
for survey_year in inter_data.survey_year.unique():
    survey_year_options.append({"label":f'{survey_year}', "value":f'{survey_year}'})

with open('data/options/survey_year_options.json', 'w') as f:
        json.dump(survey_year_options, f)

question_options=[]
for question in inter_data.question.unique():
    question_options.append({"label":question, "value":question})

with open('data/options/question_options.json', 'w') as f:
        json.dump(question_options, f)

demographic_options=[]
for demographic in inter_data.demographic.unique():
    demographic_options.append({"label":demographic, "value":demographic})

with open('data/options/demographic_options.json', 'w') as f:
        json.dump(demographic_options, f)

department_options=[]
for department in inter_data.department.unique():
    department_options.append({"label":department, "value":department})

with open('data/options/department_options.json', 'w') as f:
        json.dump(department_options, f)