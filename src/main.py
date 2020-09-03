import requests
import json  # javascript object notation
import pyttsx3
import speech_recognition as sr
import re  # regex
import threading
import time

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
        self.data = self.get_data()

    def get_data(self):
        response = requests.get(f'https://www.parsehub.com/api/v2/projects/{self.project_token}/last_ready_run/data',
                                params={'api_key': self.api_key})
        data = json.loads(response.text)
        return data

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

    def get_total_recovered(self):
        recovered = self.data['total']
        for total in recovered:
            if total['name'] == 'Recovered:':
                return total['value']

    def get_country_data(self, name):
        countries = self.data['country']
        for country in countries:
            if country['name'].lower() == name.lower():
                return country

    def get_country_names(self):
        countries = self.data['country']
        country_names = []
        for country in countries:
            country_names.append(country['name'].lower())
        return country_names

    def update_data(self):
        response = requests.post(f'https://www.parsehub.com/api/v2/projects/{self.project_token}/run',
                                 params=self.params)

        def poll():
            time.sleep(0.1)
            old_data = self.data
            while True:
                new_data = self.get_data()
                if new_data != old_data:
                    self.data = new_data
                    print("Data updated")
                    break
                time.sleep(5)

        t = threading.Thread(target=poll)
        t.start()


def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()


def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source)
        said = ""
        try:
            said = r.recognize_google(audio)
        except Exception as e:
            print("Exception", str(e))
        return said.lower()


# data = Data(API_KEY, PROJECT_TOKEN)
# print(data.get_country_data('India'))
# data = Data(API_KEY, PROJECT_TOKEN)
# print(data.get_data())

# speak("Hello All")
# print(get_audio())

# def main():
#     print("Started")
#     data = Data(API_KEY, PROJECT_TOKEN)
#     END_PHRASE = 'stop'
#     country_names = data.get_country_names()
#
#     TOTAL_PATTERNS = {
#         re.compile("[\\w\\s]+ total [\\w\\s]+ cases"): data.get_total_cases,
#         re.compile("[\\w\\s]+ total cases"): data.get_total_cases,
#         re.compile("[\\w\\s]+ total cases [\\w\\s]+"): data.get_total_cases,
#         re.compile("total cases [\\w\\s]+"): data.get_total_cases,
#         re.compile("total cases"): data.get_total_cases,
#         re.compile("[\\w\\s]+ total deaths [\\w\\s]+"): data.get_total_deaths,
#         re.compile("[\\w\\s]+ total [\\w\\s]+ deaths"): data.get_total_deaths,
#         re.compile("[\\w\\s]+ total deaths"): data.get_total_deaths,
#         # re.compile("total death [\\w\\s]+"): data.get_total_deaths,
#         re.compile("total deaths"): data.get_total_deaths,
#         re.compile("[\\w\\s]+  total recovered [\\w\\s]+"): data.get_total_recovered,
#         re.compile("[\\w\\s]+ total recovered"): data.get_total_recovered,
#         # re.compile("total recovered [\\w\\s]+"): data.get_total_recovered,
#         re.compile("total recovered"): data.get_total_recovered,
#         re.compile("[\\w\\s]+ total death [\\w\\s]+"): data.get_total_deaths
#     }
#
#     COUNTRY_PATTERNS = {
#         re.compile("[\\w\\s]+ cases [\\w\\s]+"): lambda country: data.get_country_data(country)['total_cases'],
#         re.compile("[\\w\\s]+ deaths [\\w\\s]+"): lambda country: data.get_country_data(country)['total_deaths'],
#         re.compile("[\\w\\s]+ recovered [\\w\\s]+"): lambda country: data.get_country_data(country)[
#             'total_recovered']
#     }
#
#     UPDATE_COMMAND = "update"
#
#     while True:
#         print('Listening.....')
#         text = get_audio()
#         print(text)
#         result = None
#         for pattern, func in COUNTRY_PATTERNS.items():
#             if pattern.match(text):
#                 words = set(text.split(" "))
#                 for word in words:
#                     if word in country_names:
#                         result = func(word)
#                         break
#                 break
#
#         for pattern, func in TOTAL_PATTERNS.items():
#             if pattern.match(text):
#                 result = func()
#                 break
#
#         if text == UPDATE_COMMAND:
#             result = "Data is being updated. This may take a moment!"
#             data.update_data()
#
#         if text.find(END_PHRASE) != -1:
#             print('Exit')
#             break
#
#         if result:
#             speak(result)
#             print(result)
#
#
# main()

# print(get_audio())
# speak('Hello Tushar and tanishq')
# data = Data(API_KEY, PROJECT_TOKEN)
# print(data.data)
# print(data.data)
# print(data.get_total_cases())
# print(data.get_total_deaths())
# print(data.get_country_data('India'))


# for audio we use some of the packages :

# 1. pywin32
# 2. pyttsx3
# 3.SpeechRecognition
# 4.pyaudio
# def get_country(name):
#     d = data.get_data()
#     countries = d['country']
#     for i in countries:
#         if i['name'] == name:
#             return i['total_cases'], i['total_deaths'], i['total_recovered']
#
#
# print(get_country('USA'))
