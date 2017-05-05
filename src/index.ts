import '../.env';
import * as yargs from 'yargs';
import axios from 'axios'

import StudentRequest from './requests/Student';
import MajorRequest from './requests/Major';

const base_url = process.env["API_URL"];

const argv = yargs
    .usage('$0 <cmd> [args]')
    .command('major [id]', 'Get information about majors')
    .command('student [id]', 'Get information about students', yargs => {
        return yargs.options({
            'c': {
                alias: "availableCourses",
                describe: 'List the courses available to the given student',
                type: 'boolean'
            }
        });
    })
    .command('courses', 'Get a list of courses')
    .help()
    .argv;

// display all majors
if (argv._[0] === 'major') {

    // single major
    if (argv.id) {
        MajorRequest.getById(argv.id);
    }
    
    // multiple majors
    else {
        MajorRequest.getAll();
    }
}

// display all courses
else if (argv._[0] === 'courses') {
    console.log('\nCourses: \n')
    axios
        .get(`${base_url}/api/course`)
        .then( response => {
            response.data.map( course => {
                console.log(`ID: ${course.id}`);
                console.log(`Name: ${course.name}`);
                console.log(`Required Major ID: ${course.major_id}\n`);
            });
        });
}


// display student information
else if (argv._[0] === 'student') {
    // single student
    if (argv.id) {

        // available courses
        if (argv.availableCourses) {
            StudentRequest.getAvailableCourses(argv.id);
        }
        else {
            StudentRequest.getById(argv.id);
        }
    } 
    
    // multiple students
    else {
        StudentRequest.getAll()
    }
}
