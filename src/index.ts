import '../.env';
import * as yargs from 'yargs';
import axios from 'axios'

import StudentRequest from './requests/Student';
import MajorRequest from './requests/Major';
import CourseRequest from './requests/Course';

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
    .command('course [id]', 'Get a list of courses', yargs => {
        return yargs.options({
            'e': {
                alias: "enrolledStudents",
                describe: 'List the students who are currently enrolled in the course',
                type: 'boolean'
            }
        });
    })
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
else if (argv._[0] === 'course') {
    
    // single course
    if (argv.id) {

        // enrolled student
        if (argv.enrolledStudents) {
            CourseRequest.getEnrolledStudents(argv.id);
        } else {
            CourseRequest.getById(argv.id);
        }
    }

    // multiple courses
    else {
        CourseRequest.getAll();
    }
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
