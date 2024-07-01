# A simple usecase for LocalStack

This app is a simple Node.js API that can POST items and GET all items. This API uses DynamoDB as the database and LocalStack to emulate this service in the development environment.
## Installation

This project use npm as package manager

```bash
  npm install 
```
    
## Tech Stack

**Server:** Node 22.x and AWS SDK v3

**Infra:**  Docker, docker-compose and LocalStack

**Database:**  DynamoDB

**Cloud:** AWS


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Run the docker-compose

```bash
  docker-compose up -d
```

Start the server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command. LocalStack container must be running.

```bash
  npm run test
```



