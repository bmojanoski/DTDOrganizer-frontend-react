import axios from '../custom-axios/axios'
import authHeader from "../services/auth-header";



const API_URL = 'http://localhost:8080/api/v1/';

const DTDService = {

    // FOOD
    fetchRestaurants: ()=> {
        return axios.get(API_URL + 'restaurants');
    },
    // ORDERS
    fetchOrders: ()=> {
        return axios.get(API_URL + 'orders' );
    },
    // BOOKS
    fetchBooks: ()=> {
        return axios.get(API_URL + 'books', { headers: authHeader() });
    },
    fetchBooksById: (isbn)=> {
        return axios.get(API_URL + `books/`+ isbn.isbn, { headers: authHeader() });
    },
    addBook: (book) => {
        return axios.post("/api/v1/books",book,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },
    addFood: (food) => {
        return axios.post("/api/v1/food",food,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },
    addRestaurant: (restaurant) => {
        return axios.post("/api/v1/restaurants",restaurant,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },
    postOrder: (order) => {
        return axios.post("/api/v1/orders", order ,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },

    // COURSES
    fetchCourses: ()=> {
        return axios.get(API_URL + 'courses', { headers: authHeader() });
    },
    addCourse: (course) => {

        return axios.post("/api/v1/courses",course,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },

    // DOCUMENTS
    fetchDocuments: ()=> {
        return axios.get(API_URL + 'documents', { headers: authHeader() });
    },
    addDocument: (document) => {

        return axios.post("/api/v1/documents",document,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },

    //RESOURCES
    addRequest: (newRequest) => {
        return axios.post("/api/v1/resource-request", newRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    // Office
    fetchOffice: ()=> {
        return axios.get(API_URL + 'resources/office', { headers: authHeader() });
    },
    addResource: (resource) => {
        return axios.post("/api/v1/resources",resource,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },

    // WorkMaterials
    fetchWorkMaterials: ()=> {
        return axios.get(API_URL+ 'resources/materials', { headers: authHeader() });
    },

    // Utilities
    fetchUtilities: ()=> {
        return axios.get(API_URL + 'resources/utilities', { headers: authHeader() });
    },

    //Events
    fetchEvents: () => {
        return axios.get(API_URL + 'calendar', { headers: authHeader() });
    },

    updateEvent : (event) => {
        return axios.put("/api/v1/calendar/"+ event.id, event,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },
    addEvent: (event) => {
        return axios.post("/api/v1/calendar",event,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },
    deleteEvent: (id) => {
        return axios.delete("/api/v1/calendar/"+id,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },





};

export default DTDService;
