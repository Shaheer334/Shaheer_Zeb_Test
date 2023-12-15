# Takmil Project Instructions

- POST API is created in Python, Which will accept JSON as an input parameter.

## NODEJS API

- Insert/Update
- GET By School ID
- GET By Schools
- Delete Schools By ID and Related relational data

## Insert/Update API [POST]

`{{base_url}}/api/school/{school_id}?`

- example used in the code:

  - on insert
    `http://localhost:3000/api/school/`

  - on update
    `http://localhost:3000/api/school/657ccb2c5433d9f07e705e8f`

  - MongoDB Document on Insert

  ```json
  {
    "_id": {
      "$oid": "657ccb2c5433d9f07e705e8f"
    },
    "name": "School-A",
    "__v": 0,
    "address": {
      "$oid": "657ccb2c5433d9f07e705e8b"
    },
    "endTime": "1:30pm",
    "hasLaptop": false,
    "hasProjector": false,
    "organization": {
      "$oid": "657ccb2c5433d9f07e705e8d"
    },
    "shift": "Morning",
    "startTime": "8:30am",
    "status": "old"
  }
  ```

  - Mongodb Document On Update

  ```json
  {
    "_id": {
      "$oid": "657ccb2c5433d9f07e705e8f"
    },
    "__v": 0,
    "address": {
      "$oid": "657ccb8d5433d9f07e705ed1"
    },
    "endTime": "2:00pm",
    "hasLaptop": false,
    "hasProjector": false,
    "name": "School-B",
    "organization": {
      "$oid": "657ccb2c5433d9f07e705e8d"
    },
    "shift": "Evening",
    "startTime": "9:00am",
    "status": "new"
  }
  ```

## GET By School ID [GET]

`{{base_url}}/api/school/{school_id}`

- example used in the code:
  `http://localhost:3000/api/school/657ccb2c5433d9f07e705e8f`

  ```json
  {
    "_id": "657ccb2c5433d9f07e705e8f",
    "__v": 0,
    "address": {
      "_id": "657ccb8d5433d9f07e705ed1",
      "state": "Balochistan",
      "address": "address-1",
      "longitude": 69.47,
      "district": "Quetta",
      "tehsil": "Barkhan",
      "town": "Nehar Kot",
      "latitude": 29.79,
      "__v": 0
    },
    "endTime": "2:00pm",
    "hasLaptop": false,
    "hasProjector": false,
    "name": "School-B",
    "organization": {
      "_id": "657ccb2c5433d9f07e705e8d",
      "name": "publicschools",
      "__v": 0
    },
    "shift": "Evening",
    "startTime": "9:00am",
    "status": "new"
  }
  ```

## GET By Schools [GET] - All schools

`{{base_url}}/api/schools`

- example used in the code:
  `http://localhost:3000/api/schools`

  ```json
  [
    {
      "_id": "657ccb2c5433d9f07e705e8f",
      "__v": 0,
      "address": {
        "_id": "657ccb8d5433d9f07e705ed1",
        "state": "Balochistan",
        "address": "address-1",
        "longitude": 69.47,
        "district": "Quetta",
        "tehsil": "Barkhan",
        "town": "Nehar Kot",
        "latitude": 29.79,
        "__v": 0
      },
      "endTime": "2:00pm",
      "hasLaptop": false,
      "hasProjector": false,
      "name": "School-B",
      "organization": {
        "_id": "657ccb2c5433d9f07e705e8d",
        "name": "publicschools",
        "__v": 0
      },
      "shift": "Evening",
      "startTime": "9:00am",
      "status": "new"
    },
    {
      "_id": "657cd06c5433d9f07e70638a",
      "name": "School-A",
      "__v": 0,
      "address": {
        "_id": "657ccb2c5433d9f07e705e8b",
        "state": "Balochistan",
        "latitude": 29.79,
        "tehsil": "Barkhan",
        "town": "Nehar Kot",
        "district": "Barkhan",
        "longitude": 69.47,
        "address": "address-1",
        "__v": 0
      },
      "endTime": "1:30pm",
      "hasLaptop": false,
      "hasProjector": false,
      "organization": {
        "_id": "657ccb2c5433d9f07e705e8d",
        "name": "publicschools",
        "__v": 0
      },
      "shift": "Morning",
      "startTime": "8:30am",
      "status": "old"
    }
  ]
  ```

## Delete Schools By ID [DELETE]

`{{base_url}}/api/school/{school_id}`

- example used in the code:
  `http://localhost:3000/api/school/657ccb2c5433d9f07e705e8f`

  ```json
  [
    {
      "_id": "657cd06c5433d9f07e70638a",
      "name": "School-A",
      "__v": 0,
      "address": {
        "_id": "657ccb2c5433d9f07e705e8b",
        "state": "Balochistan",
        "latitude": 29.79,
        "tehsil": "Barkhan",
        "town": "Nehar Kot",
        "district": "Barkhan",
        "longitude": 69.47,
        "address": "address-1",
        "__v": 0
      },
      "endTime": "1:30pm",
      "hasLaptop": false,
      "hasProjector": false,
      "organization": null,
      "shift": "Morning",
      "startTime": "8:30am",
      "status": "old"
    }
  ]
  ```

## To RUN the project

- Python

  - Please install Flask and Requests
    ```shell
    pip install Flask requests
    ```
  - To Run the Python project
    ```shell
    cd project_dirctory
    python postAPI.py
    ```

- NodeJs
  - Please install the required dependencies using following command
    ```shell
    cd project_dirctory
    npm install
    ```
  - To Run the NodeJs project
    ```shell
    node nodeAPI.js
    ```
