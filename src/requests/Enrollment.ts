import axios from 'axios';
import StudentFormatter from '../formatters/Student';
import CourseRequest from '../requests/Course';

const baseURL = `${process.env.API_URL}/api/student/enroll`;

/**
 * A collection of functions to handle Enrolling a student in a course
 */
namespace EnrollmentRequest {

    /**
     * Enroll a student in a course and print the new list
     */
    export function enroll(student_id: number, course_id: number) {
        console.log(student_id);
        console.log(course_id);
        axios
            .post(`${baseURL}`, { student_id: student_id, course_id: course_id})
            .then( response => {
                console.log(response.data.message);
                return axios.get(`${process.env.API_URL}/api/course/${course_id}/enrolledStudents`);
            })
            .then( response => {
                StudentFormatter.printList(response.data);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }
}

export default EnrollmentRequest;