# VacTrack

# Coding Guidelines

## Python

Please refer to the below link of pep8 coding guidlines.

* https://www.python.org/dev/peps/pep-0008/
* https://realpython.com/python-pep8/

## React

Please refer to the below link of airbnb React coding guidlines.

* https://airbnb.io/javascript/react/#basic-rules

# Developer Setup

## Initial Setup

`python install`

`pip install pipenv`

`node install`

## Subsequent Setup

### Python Django Setup

#### Prerequisites

- Install and set up a local programming environment for Python 3.8

#### Setting up the vactrack

Clone the repository and checkout develop branch

Next, we will navigate into the directory:

`$ cd vactrack`

Now we will create and activate a new virtual environment:

`$ pipenv shell`

Let’s install all the dependencies using pipenv 

`$ pipenv install`

Next, we will navigate into the vactrack_backend folder and start up the server.

`$ cd vactrack_backend`

`$ python manage.py runserver`

At this point, if all the commands were entered correctly, we should see an instance of a Django application running on this address — http://127.0.0.1:8000

### React JS Setup

#### Prerequisites

- Install Node.js and Create a Local Development Environment

#### Setting up the React application for vactrack

Navigate into the frontend directory:

`$ cd vactrack_frontend`

Run the application by using following command

`$ npm start`

At this point, if all the commands were entered correctly, we should see an instance of a React application running on this address — http://127.0.0.1:3000
