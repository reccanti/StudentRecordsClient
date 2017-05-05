import axios from 'axios';
import StudentFormatter from '../formatters/Student';
import CourseFormatter from '../formatters/Course';

const baseURL = `${process.env.API_URL}/api/student`;

/**
 * A collection of functions to handle the Student API endpoints
 */
namespace StudentRequest {

    /**
     * Fetch a list of all students and print it out
     */
    export function getAll() {
        axios
            .get(`${baseURL}`)
            .then( response => {
                StudentFormatter.printList(response.data);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }

    /**
     * Fetch a specific student by ID
     * 
     * @param id - the id of the student we want to retrieve
     */
    export function getById(id: number) {
        axios
            .get(`${baseURL}/${id}`)
            .then( response => {
                StudentFormatter.printList([response.data]);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }

    /**
     * Fetch all the courses a student can take
     * 
     * @param id - the id of the student we want to get available courses for
     */
    export function getAvailableCourses(id: number) {
        axios
            .get(`${baseURL}/${id}/availableCourses`)
            .then( response => {
                CourseFormatter.printList(response.data);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }
}

export default StudentRequest;