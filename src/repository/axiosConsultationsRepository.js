import axios from '../custom-axios/axios'



const DTDService = {

    // BOOKS
    fetchBooks: ()=> {
        return axios.get("/api/v1/books");
    },
    fetchBooksById: (isbn)=> {
        return axios.get(`/api/v1/books/`+isbn.isbn);
    },
    addBook: (book) => {
        return axios.post("/api/v1/books",book,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },

    // COURSES
    fetchCourses: ()=> {
        return axios.get("/api/v1/courses");
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
        return axios.get("/api/v1/documents");
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
        return axios.get("/api/v1/resources/office");
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
        return axios.get("/api/v1/resources/materials");
    },

    // Utilities
    fetchUtilities: ()=> {
        return axios.get("/api/v1/resources/utilities");
    },

    //Events
    fetchEvents: () => {
        return axios.get("/api/v1/calendar");
    },

    updateEvent : (event) => {
        return axios.put("/api/v1/calendar/"+ event.id, event,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    }





};

export default DTDService;
