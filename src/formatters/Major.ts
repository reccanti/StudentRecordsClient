/**
 * Handles functions to format the output of Major data
 */
namespace MajorFormat {
    
    /**
     * Print a formatted list of majors
     */
    export function printList (majors) {
        console.log('\nMajors: \n');
        majors.map(major => {
            console.log(`ID: ${major.id}`);
            console.log(`Name: ${major.name}\n`);
        });
    }
}

export default MajorFormat;