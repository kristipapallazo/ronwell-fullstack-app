# ronwell-fullstack-app

Fullstack E-commerce app

1. Clone the repository

git clone https://github.com/kristipapallazo/ronwell-fullstack-app

2. Install the dependencies (only on Root folder)

npm i

3. Create a new json file with name "default.json" inside the "Server" folder on the config folder

touch ./server/config/default.json

- if config folder dont exist, create a new folder with the same name (config)

  mkdir ./server/config

4. Add the content inside the default.json file. You can find the file content on a seperate file (not added in this README file for security reasons)

cat >> ./server/config/default.json
copy content
ctrl + V (to paste)
ctrl + C (to stop)

- Alternatively use the following approach

nano ./server/config/default.json
copy content
ctrl + V (to paste)
ctrl + X (to exi)

5. Some api calls need login for the auth

- Create a user with a random email and password
