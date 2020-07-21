import requests
import json
import pyttsx3
import speech_recognition as sr
import re

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
            if country['name'].lower() == name.lower():
                return country


def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()


def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source)
        said = ""

        try:
            said = r.recognize_google(audio)
        except Exception as e:
            print("Exception", str(e))
        return said

# print(get_audio())

# speak('Hello Ladies and Gentlemen')

# data = Data(API_KEY, PROJECT_TOKEN)
# print(data.data)
# print(data.get_total_cases())
# print(data.get_total_deaths())
# print(data.get_country_data('India'))

# for audio we use some of the packages :
# 1. pywin32
# 2. pyttsx3
# 3.SpeechRecognition
# 4.pyaudio
