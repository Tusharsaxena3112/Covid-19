import requests
import json

API_KEY = 'tesSpQOvJQ4h'
PROJECT_TOKEN = 'tiO63kghSOtt'
RUN_TOKEN = 'tcjR4hF7HhHn'


class Data:
    def __init__(self, api_key, project_token):
        self.api_key = api_key
        self.project_token = project_token
        self.params = {
            'api_key': api_key
        }
        self.get_data()

    def get_data(self):
        response = requests.get(f'https://www.parsehub.com/api/v2/projects/{self.project_token}/last_ready_run/data',
                                params={'api_key': self.api_key})
        self.data = json.loads(response.text)

    def get_total_cases(self):
        totals = self.data['total']
        for total in totals:
            if total['name'] == 'Coronavirus Cases:':
                return total['value']

    def get_total_deaths(self):
        deaths = self.data['total']
        for total in deaths:
            if total['name'] == 'Deaths:':
                return total['value']

    def get_country_data(self, name):
        countries = self.data['country']
        for country in countries:
            if country['name'] == name:
                return country['total_cases'], country['total_deaths'], country['total_recovered']


data = Data(API_KEY, PROJECT_TOKEN)
print(data.data)
print(data.get_total_cases())
print(data.get_total_deaths())
