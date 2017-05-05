import axios from 'axios';
import CourseFormatter from '../formatters/Course';
import StudentFormatter from '../formatters/Student';

const baseURL = `${process.env.API_URL}/api/course`;

/**
 * A collection of functions to handle the Course API endpoints
 */
namespace CourseRequest {

    /**
     * Fetch a list of all courses and print it out
     */
    export function getAll() {
        axios
            .get(`${baseURL}`)
            .then( response => {
                CourseFormatter.printList(response.data);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }

    /**
     * Fetch a specific course by ID
     * 
     * @param id - the id of the course we want to retrieve
     */
    export function getById(id: number) {
        axios
            .get(`${baseURL}/${id}`)
            .then( response => {
                CourseFormatter.printList([response.data]);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }

    /**
     * Fetch the students enrolled in the given course
     * 
     * @param id - the id of the course we want to get the 
     * enrolled students from
     */
    export function getEnrolledStudents(id: number) {
        console.log(`${baseURL}/${id}/enrolledStudents`);
        axios
            .get(`${baseURL}/${id}/enrolledStudents`)
            .then( response => {
                StudentFormatter.printList(response.data);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }
}

export default CourseRequest;