
    cd 160
    # install dependencies from package.json
    npm install
    # start the server
    npm start

Then visit this url in your browser: http://localhost:3001/api/getData




userAPI

requests.put('http://localhost:3001/api/putUser', {'id': 9091, 'username': 'jeffy', 'password': '12345', 'email': 'jeffy@sjsu.edu'})

will create a user

requests.post('http://localhost:3001/api/login', {'username': 'jeffy', 'password': '12345'}).text)

will allow a user to 'login' currently will only check and verify credentials and return a success or failure message 
