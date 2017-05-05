# StudentRecordsClient

A command line client for accessing Student Records data. The goal of this was to provide a lightweight 'view' that wrapped around the API described in the [StudentRecords Server](https://github.com/reccanti/StudentRecords/).

There are 3 general parts to this client: a simple command line parser, groups of API requesters, and groups of text formatters. The command line parser interprets the user's input and connects it to the appropriate response. The API requesters are responsible for making AJAX requests to the server. And the text formatters take the JSON data that was fetched from the server and put it into a more legible format.

## Requirements

- **Node.js** >= 7.10.0
- **npm** >= 4.3.0

## Setup

Before you begin, make sure you setup and start the StudentRecords server using the steps outlined [here](https://github.com/reccanti/StudentRecords#setup). Once that's done, perform the following steps:

1. Clone the repo using `git clone https://github.com/reccanti/StudentRecordsClient.git` 
2. install dependencies using `npm install`
3. Copy the `.env.example.js` file using `cp .env.example.js > .env.example.js`. Replace the placeholder data with the address of your server
4. Compile TypeScript using `npm run compile`
5. Run any of the following commands using `npm run StudentRecords`

## Commands

The following commands can be run in the format `npm run StudentRecords [command]`. Additional information can be found using `npm run StudentRecords --helps`

### `student [id]` 

retrieves information about students

- `[id]` an optional parameter. If specified it will return information about a specific student. Otherwise it will return a list of all students in the database
- `-c, --availableCourses` a boolean option. If specified with a single student, it will return a list of courses that student can take

### `course [id]` 

retrieves information about courses

- `[id]` an optional parameter. If specified it will return information about a specific course. Otherwise it will return a list of all courses in the database
- `-e, --enrolledStudents` a boolean option. If specified with a single course, it will return a list of students enrolled in that course

### `major [id]`

retrieve information about majors

- `[id]` an optional parameter. If specified it will return information about a specific major. Otherwise it will return a list of all students in the database

### `enroll`

Attempt to enroll a student in the database

- `-s="..." --student_id="..."` a mandatory parameter. Refers to the ID of the student who is being enrolled in the course.
- `-c="..." --course_id="..."` a mandatory parameter. Refers to the ID of the course we are trying to enroll a student into.
