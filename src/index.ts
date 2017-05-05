import '../.env';
import * as yargs from 'yargs';
import axios from 'axios'

const base_url = process.env["API_URL"];

// fetch(`http://127.0.0.1/api/major`).then(function(res) {
//     return res.text();
// }).then(function (json) {
//     console.log(json);
// }).catch(function (err) {
//     console.log(err);
// });

// axios.get(`http://127.0.0.1:8080/api/major`).then( res => {
//     return console.log(res); 
// });

const argv = yargs
    .usage('$0 <cmd> [args]')
    .command('majors', 'Get a list of all majors')
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


// console.log(argv);

// display all majors
if (argv._[0] === 'majors') {
    console.log('\nMajors: \n')
    axios
        .get(`${base_url}/api/major`)
        .then( response => {
            response.data.map( major => {
                console.log(`ID: ${major.id}`);
                console.log(`Name: ${major.name}\n`);
            });
        });
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
    if (argv.id) {
        if (argv.availableCourses) {
            console.log('\nCourses: \n');
            axios
                .get(`${base_url}/api/student/${argv.id}/availableCourses`)
                .then( response => {
                    response.data.map( course => {
                        console.log(`ID: ${course.id}`);
                        console.log(`Name: ${course.name}`);
                        console.log(`Required Major ID: ${course.major_id}\n`);
                    });
                });
        }
        else {
            console.log('\nStudents: \n')
            axios
                .get(`${base_url}/api/student/${argv.id}`)
                .then( response => {
                    const student = response.data;
                    console.log(`ID: ${student.id}`);
                    console.log(`Name: ${student.first} ${student.last}`);
                    console.log(`Major ID: ${student.major_id}\n`);
                })
                .catch( err => {
                    console.log(`${err.response.statusText}\n`);
                });
        }
    } else {
        console.log('\nStudents: \n')
        axios
            .get(`${base_url}/api/student`)
            .then( response => {
                response.data.map( student => {
                    console.log(`ID: ${student.id}`);
                    console.log(`Name: ${student.first} ${student.last}`);
                    console.log(`Major ID: ${student.major_id}\n`);
                });
            });
    }
}

// display all courses