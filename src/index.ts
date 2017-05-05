import '../.env';
import * as yargs from 'yargs';
import axios from 'axios'

import StudentRequest from './requests/Student';
import MajorRequest from './requests/Major';
import CourseRequest from './requests/Course';
import EnrollmentRequest from './requests/Enrollment';

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
    .command('enroll', 'Enroll a student in a specified course', yargs => {
        return yargs.options({
            's': {
                alias:"student_id",
                describe: "The ID of the student we want to enroll in a course",
                type: "number",
                demandOption: true,
                requiresArg: true
            },
            'c': {
                alias:"course_id",
                describe: "The ID of the course we want to enroll the student in",
                type: "number",
                demandOption: true,
                requiresArg: true
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

// enroll a student in a course
else if (argv._[0] === 'enroll') {
    EnrollmentRequest.enroll(argv.student_id, argv.course_id);
}
