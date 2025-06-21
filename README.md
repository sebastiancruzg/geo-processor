
# Geo-processor

This project is a mono-repo to maintain simplicity and accessibility since it's a small project.

## Services

### FastAPI

* Processes points
* Simplest service. Followed the recommended structure by FastAPI and used UV as a package manager for efficiency and because of its speed.
* Running on port 8010

### NestJS

* Caching and forwarding to FastAPI
* Probably the service I spent the most time on since it's a new technology for me. Followed the structure that NestJS itself generates. Most decisions were made based on Nest documentation, such as using CacheModule and HttpModule. Other than that, it's pretty simple.
* Running on port 8011

### NextJS

* Simple Leaflet map and form
* Although I have some experience with React, I've never worked with Next.js before, so it took some time to get accustomed. Used Leaflet for the map API because I've used it before and it has a React integration through the react-leaflet library. Other than that, it's pretty standard React development. Used Tailwind for styling for practicality and because I've worked with it before.
* Running on port 8012

## Installation

1. Install Docker
2. Run `docker compose up --build`
