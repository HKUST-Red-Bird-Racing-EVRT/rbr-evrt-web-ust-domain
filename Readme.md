# Github repo for [HKUST Red Bird Racing EVRT Website](https://rbrevrt.hkust.edu.hk/)

### Setting up
1. Git clone this repo
2. Go to the folder rbr-evrt-web-ust-domain
3. Set your ports for the webpage, mysql and other environment variales in .env.local, and in docker-composer.yml
4. Run ```docker-compose up --build -d``` (It takes around 13 minutes to build on an M1 pro macbook)
5. Using a browser, open up the website hosted on locoalhost