import axios from 'axios';
import MajorFormatter from '../formatters/Major';

const baseURL = `${process.env.API_URL}/api/major`;

/**
 * A collection of functions to handle the Major API endpoints
 */
namespace MajorRequest {

    /**
     * Fetch a list of all majors and print it out
     */
    export function getAll() {
        axios
            .get(`${baseURL}`)
            .then( response => {
                MajorFormatter.printList(response.data);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }

    /**
     * Fetch a specific major by ID
     * 
     * @param id - the id of the major we want to retrieve
     */
    export function getById(id: number) {
        axios
            .get(`${baseURL}/${id}`)
            .then( response => {
                MajorFormatter.printList([response.data]);
            })
            .catch( err => {
                console.log(`${err.response.statusText}\n`);
            });
    }
}

export default MajorRequest;