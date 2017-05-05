/**
 * Handles functions to format the output of Student data
 */
namespace StudentFormat {
    
    /**
     * Print a formatted list of students
     */
    export function printList (students) {
        console.log('\nStudents: \n');
        students.map(student => {
            console.log(`ID: ${student.id}`);
            console.log(`Name: ${student.first} ${student.last}`);
            console.log(`Major ID: ${student.major_id}\n`);
        });
    }
}

export default StudentFormat;