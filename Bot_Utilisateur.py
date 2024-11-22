from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from faker import Faker
import time
import random
import pandas as pd

url = "https://sportsmate.rezel.net/inscription.html"

number_profiles = 100

def create_profiles(number_profiles):
    fake = Faker()
    profiles = []

    # Lire la liste des sports
    df = pd.read_csv(r"C:\Users\cadij\Downloads\sports.csv")

    photopath = r"C:\Users\cadij\Downloads\love.png"
    for _ in range(number_profiles):

        username = fake.simple_profile()["username"]
        password = fake.password()
        genre = fake.random_choices(elements=('M', 'F', 'NB'),length=1)[0]
        if (genre=='M'):
            first_name = fake.first_name_male()
        elif (genre=="F"):
            first_name = fake.first_name_female()
        else :
            first_name = fake.first_name_nonbinary()
        age = random.randint(13, 50)
        Sports = [df["Sports"].iloc[random.randint(0,len(df)-1)],df["Sports"].iloc[random.randint(0,len(df)-1)],df["Sports"].iloc[random.randint(0,len(df)-1)]]
        profile = {
            "username": username,
            "password": password,
            "Genre": genre,
            "first_name": first_name,
            "Age": age,
            "Sport1": Sports[0],
            "Sport2": Sports[1],
            "Sport3": Sports[2],
            "Bio": f"Salut, je m''appelle {first_name}, j''ai {age} ans et les sports que je pratique sont les suivants : {Sports[0]},{Sports[1]},{Sports[2]}",
            "Photo": photopath,
        }
        profiles.append(profile)
    return profiles

def inscription(url,profiles):

    firefox_options = Options()
    firefox_options.add_argument("--headless")  # Exécution sans interface graphique
    # firefox_options.add_argument("--window-size=1920x1080")  # Taille de la fenêtre du navigateur

    driver = webdriver.Firefox(options=firefox_options)

    number_profiles = len(profiles)

    for profile in range(number_profiles):

        driver.get(url)

        # Attendre que les champs soient présents
        wait = WebDriverWait(driver, 10)


        # Remplir les champs du formulaire
        username = wait.until(EC.presence_of_element_located((By.NAME, 'username')))
        password = wait.until(EC.presence_of_element_located((By.NAME, 'mdp')))
        confirm_password = wait.until(EC.presence_of_element_located((By.NAME, 'mdp2')))

        # Envoyer les informations
        username.send_keys(profiles[profile]["username"])
        password.send_keys(profiles[profile]["password"])
        confirm_password.send_keys(profiles[profile]["password"])

        # Trouver et cliquer sur le bouton de soumission
        submit_button = wait.until(EC.presence_of_element_located((By.ID, 'inscription')))
        submit_button.click()

        # Attendre que les champs soient présents
        wait = WebDriverWait(driver, 10)

        # Remplir les champs du 2nd formulaire
        first_name = wait.until(EC.presence_of_element_located((By.NAME, 'prenom')))
        age = wait.until(EC.presence_of_element_located((By.NAME, 'age')))
        genre = wait.until(EC.presence_of_element_located((By.NAME, 'genre')))
        sport1 = wait.until(EC.presence_of_element_located((By.NAME, 'sport_input1')))
        sport2 = wait.until(EC.presence_of_element_located((By.NAME, 'sport_input2')))
        sport3 = wait.until(EC.presence_of_element_located((By.NAME, 'sport_input3')))
        bio = wait.until(EC.presence_of_element_located((By.NAME, 'bio')))
        photo_input = wait.until(EC.presence_of_element_located((By.NAME, 'photo')))

        # Envoyer les informations
        first_name.send_keys(profiles[profile]["first_name"])
        age.send_keys(profiles[profile]["Age"])
        genre.send_keys(profiles[profile]["Genre"])
        sport1.send_keys(profiles[profile]["Sport1"])
        sport2.send_keys(profiles[profile]["Sport2"])
        sport3.send_keys(profiles[profile]["Sport3"])
        bio.send_keys(profiles[profile]["Bio"])
        photo_input.send_keys(profiles[profile]["Photo"])

        # Trouver et cliquer sur le bouton de soumission
        submit_button = wait.until(EC.presence_of_element_located((By.ID, 'inscription')))
        submit_button.click()

        print(f"Compte n°{profile+1} crée !")
    driver.quit()


profiles = create_profiles(number_profiles)
inscription(url,profiles)