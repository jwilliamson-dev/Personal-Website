# Jobs

Data feeds for personal website. Some manual setup required.

This project retrieves data for my personal website from GitHub and LinkedIn so that I don't have to do it myself. The data on the website doesn't change frequently, so I run these scripts as needed.

## System Requirements

- Google Chrome
- Selenium Webdriver for Google Chrome

## Required Setup

1. Run `npm install`
2. Run `npm run build`
3. Create your .env file (template below)
4. Create your homepage.md file in the local_data directory (no template, entirely freeform)
5. Create your local_data.json file in the local_data directory (template below)

## How to Run

To generate data for local use, run `npm run local`. This will populate the data folder in the web project.

When pushing data to Azure, run `npm run azure`

## Templates

Templates for required files

### .env

```bash
# Your GitHub Personal Access Token
GITHUB_KEY=

# Your GitHub User Name
GITHUB_USERNAME=

# Path to your Chrome User Data profile
CHROME_USER_DATA=

# Your LinkedIn username as seen in your profile URL. E.g., https://linkedin.com/in/YOUR_USERNAME
LINKEDIN_USERNAME=
```

### local_data/local_data.json

The content of this file is merged with the data captured in the scripts. The data in this file takes precedent, so you can control things that you want added or overwritten.

```json
{
  "projects": {
    // Required
    "projectBlurb": "",
    // Add extra data to GitHub items. Mainly useful for adding keywords to Gists. Match projects by the `name` key
    "projectList": [{ "name": "", "keywords": [] }]
  },
  // Basic biographical info, required
  "ownerInfo": {
    "firstName": "",
    "lastName": "",
    "email": "",
    "links": {
      "github": "",
      "linkedIn": ""
    },
    "city": "",
    "stateProvince": ""
  },
  // Extra resume info, most useful for adding 1 or 2 projects to showcase
  "resume": {
    "projects": [
      {
        "name": "",
        "keywords": [],
        "description": "",
        "url": ""
      }
    ]
  }
}
```

## How it works

### LinkedIn

LinkedIn doesn't like you programmatically interacting with their website, so we are using Selenium Webdriver and Chrome to load our profile page and scrape the data.

In the .env, we are providing a path to a Chrome user profile so that we can log in ahead-of-time. Otherwise, LinkedIn will hit us with their Auth Wall. I tried to automate logging in, but then they required an email verification code. Instead of trying to automate and get around that, I figured it was best to just set up a browser that was already logged in. You must be logged into Chrome with the same account that you log into LinkedIn with.

After we scrape the HTML from the site, we parse it for the following sections: Experience, Education, and Publications. The data is then formatted to conform to the model expected by the React application. This part may break (specifically the Experience section) depending on how your profile is filled out.

The profile picture for each company/school profile is also downloaded for use in the React application.

### GitHub

Thanks to GitHub's awesome REST client, this is super straightforward! Simply list repos and gists for our user and format it to conform to the model. Couldn't be easier!

### index.ts

This file essentially just puts everything together. It gets the data from LinkedIn, GitHub, and the files in the local_data folder. It merges the data into one JSON object, and then either pushes it up to Azure, or copies it over to the React app.
