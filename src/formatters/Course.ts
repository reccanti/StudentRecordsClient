/**
 * Handles functions to format the output of Course data
 */
namespace CourseFormat {
    
    /**
     * Print a formatted list of course
     */
    export function printList (courses) {
        console.log('\nCourses: \n');
        courses.map(course => {
            console.log(`ID: ${course.id}`);
            console.log(`Name: ${course.name}`);
            console.log(`Required Major ID: ${course.major_id}\n`);
        });
    }
}

export default CourseFormat;