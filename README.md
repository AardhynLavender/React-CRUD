# IN607001 React CRUD - Aardhyn Lavender

Front-end Typescript React CRUD application for interfacing with the `intro-app-dev-2022-project-1-node-js-rest-api`.

You can view the documentation for this API [here](https://documenter.getpostman.com/view/18456662/Uyr4HzQf)

## Live Application

The deployed application can be found [here](https://id1000096681-laveat1-react.herokuapp.com/) at the following URL

```plaintext
https://id1000096681-laveat1-react.herokuapp.com/
```

You will need to `login` or `sign up` to access the system.

_registering a new user will automatically authenticate the session_

## Local Configuration and Execution

Clone and install dependencies

```shell
git clone https://github.com/otago-polytechnic-bit-courses/intro-app-dev-2022-project-2-react-crud-AardhynLavender.git
cd intro-app-dev-2022-project-2-react-crud-AardhynLavender
npm i
```

no `.env` file is needed. The URL for the API is known to the software ( it can be found in `./src/app.tsx` `ln35` )

Run the program in a development environment with

```shell
npm start
```

_React will open the default web browser for you_

Alternatively, create a static production grade build with

```shell
npm run build
```

and serve the compiled files or open the generated `html` file.

### Code Formatting

A prettier configuration has been provided.

Format the project with

```shell
npm run format
```

Alternatively, configure your text editor to format on save if possible.

## User Interface Testing ( Cypress )

For tests to function. Please run the program in your local development environment ( see **Local Configuration and Execution** )

In a seperate _shell session_ or _screen_, launch the cypress testing interface with

```shell
npm run cypress
```

From the testing interface you can run the configured tests.

| Test     | Description                                               |
| :------- | :-------------------------------------------------------- |
| Auth     | Logs in with a registered users credentials then logs out |
| Register | Registers a new user with valid credietials then logs out |

> Please note inital tests _may_ fail due to a timeout. The API runs on free Heroku Dynamos which take a while to start up from cold. As such slow startup would not exist in a production application, I felt the default 4000ms timeout length was appropriate.

> As no client is able to `DELETE` Users for the Database, any sucessfull Register will prevent subsequent Registers from succeeding due to a Atlas unique constraint failure. Please change the test's `username` and `email` before each subsequest Register.

## Deployment ( Heroku )

There are a couple of options to consider when deploying to Heroku. Automatically with **GitHub**, or manually with the **Heroku CLI**

### GitHub

- Create a new application in Heroku.
- Select the **Connect to GitHub** deployment method under **Deploy**, ( private GitHub repositories will require authentication )
- Enable automatic deploys and select your deployment branch
- _Your production build is good to go!_

This method makes use of **GitHub WebHooks** to automatically deploy your application when you push to the specified remote branch

### Heroku CLI

Follow the steps [here](https://devcenter.heroku.com/articles/heroku-command-line) to install the **Heroku CLI**

Log in to your Heroku account from the CLI

_from project root_

```shell
heroku login
heroku git:remote -a < app name >
```

Push your local `main` ( or another branch ) to the `heroku` remote branch with

```shell
git push heroku main
```

that's it! I'd recommend setting up a deployment `npm script` to make this easier.
