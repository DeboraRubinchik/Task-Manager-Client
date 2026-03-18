# TaskManagerClient
This is the client-side interface for the Task Manager application that i built with Angular version 21.2.2. It helps the user managing his daily tasks.

Development server:
To start a local server, please run:
```bash
ng serve
```

While the server is running, open your browser and navigate to "http://localhost:4200/".

Technologies Used:
- Framework: Angular version 21.2.2
- Styling: Bootstrap 5
- Communication: Angular HttpClient for REST API integration.

Requirements:
- Node.js
- Angular CLI installed globally. If you dont have it installed you can install it now:
  ```bash
  npm install -g @angular/cli

How to Run:
- Clone the repository to your computer.
- Open a terminal in the project directory. And then:
  ```bash
  npm install

Start the server:
  ```bash
  ng serve
  ```

- Open your browser at http://localhost:4200.
- Important to know: For the application to run correctly, the backend server must be running at http://localhost:5289.
- Connection in StackBlitz:
On StackBlitz it is trying to connect to the backend at http://localhost:5289.
Since the backend is not hosted online, the app will not display or save new tasks in the StackBlitz preview unless you have the server running locally on your machine.
## To see the full functionality, please follow the instructions in the Server README to run the backend locally. 
You can find it here -> https://github.com/DeboraRubinchik/Task-Manager-Server
