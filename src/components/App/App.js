import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'

// Components
import DTDService from '../../repository/axiosConsultationsRepository';
import BookList from '../Library/Books/BookList';
import BookDetails from "../Library/Books/BookDetails";
import BookAdd from "../Library/Books/BookAdd";
import CourseList from "../Library/Courses/CoursesList";
import DocumentList from "../Library/Documents/DocumentList";
import CourseAdd from "../Library/Courses/CourseAdd";
import DocumentAdd from "../Library/Documents/DocumentAdd";
import OfficeList from "../Resources/Office/OfficeList";
import MaterialList from "../Resources/WorkMaterials/MaterialList";
import UtilityList from "../Resources/Utilities/UtilityList";
import ResourcesAdd from "../Resources/ResourcesAdd";
import Calendar from "../Calendar/Calendar";
import Home from "../Home/Home";
import Food from "../Food/Food";

class App extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            courseList: [],
            documentList: [],
            officeList: [],
            wMaterialsList: [],
            utilitiesList: [],
            eventsList: [],
            restaurantList: []
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadBooks();
        this.loadCourses();
        this.loadDocuments();
        this.loadOffice();
        this.loadWorkMaterials();
        this.loadUtilities();
        this.loadRestaurants();
    }

    //RESTAURANTS
    loadRestaurants = () => {
        DTDService.fetchRestaurants().then((response) => {
            this.setState({
                restaurantList: response.data
            });
        });
    };

    //BOOKS
    loadBooks = () => {
        DTDService.fetchBooks().then((response) => {
            this.setState({
                bookList: response.data
            });
        });
    };
    addBook = (isbn,qty) => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyARYJrBPVJ9B77JveSDkwPI5IvWUGVHe1M')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const authors = []
                data.items[0].volumeInfo.authors.forEach(x=> authors.push(x))
                const newBook = {
                    "isbn": data.items[0].volumeInfo.industryIdentifiers[0].identifier,
                    "title": data.items[0].volumeInfo.title,
                    "authors": authors,
                    "pages": data.items[0].volumeInfo.pageCount,
                    "description": data.items[0].volumeInfo.description.slice(0, 255),
                    "publisher": data.items[0].volumeInfo.publisher,
                    "publishedDate": data.items[0].volumeInfo.publishedDate,
                    "rating": data.items[0].volumeInfo.ratingsCount,
                    "imagePath": data.items[0].volumeInfo.imageLinks.thumbnail,
                    "Qty": qty,
                };

                DTDService.addBook(newBook).then((response) => {
                        const newBookk = response.data;
                        debugger;
                        this.setState((prevState) => {
                            const newBookRef = [...prevState.bookList, newBookk];
                            return {
                                "bookList": newBookRef
                            }
                        })
                    }
                )
            });
    };

    //COURSES
    loadCourses = () => {
        DTDService.fetchCourses().then((response) => {
            this.setState({
                courseList: response.data

            });
        });
    };
    addCourse = (course) => {
        DTDService.addCourse(course).then((response) => {
            const newCourse = response.data;
            this.setState((prevState) => {
                const newCourseRef = [...prevState.courseList, newCourse];
                return {
                    "courseList": newCourseRef
                }
            })
        })
    };

    //OTHER DOCS
    loadDocuments = () => {
        DTDService.fetchDocuments().then((response) => {
            this.setState({
                documentList: response.data
            });
        });
    };
    addDocument = (document) => {
        DTDService.addDocument(document).then((response) => {
            const newDocument = response.data;
            this.setState((prevState) => {
                const newDocumentRef = [...prevState.documentList, newDocument];
                return {
                    "documentList": newDocumentRef
                }
            })
        })
    };

    //OFFICE
    loadOffice = () => {
        DTDService.fetchOffice().then((response) => {
            this.setState({
                officeList: response.data
            });
        });
    };

    //Work materials
    loadWorkMaterials = () => {
        DTDService.fetchWorkMaterials().then((response) => {
            this.setState({
                wMaterialsList: response.data
            });
        });
    };

    //Utilities
    loadUtilities = () => {
        DTDService.fetchUtilities().then((response) => {
            this.setState({
                utilitiesList: response.data
            });
        });
    };

    addRequest = (request) => {
        DTDService.addRequest(request).then((response) => {

        });
    };
    addResource = (resource) => {
        DTDService.addResource(resource).then((response) => {
            const newResource = response.data;
            this.setState((prevState) => {
                if (newResource.resourceType === "Office") {
                    const newOfficeRef = [...prevState.officeList, newResource];
                    return {
                        "officeList": newOfficeRef
                    }
                } else if (newResource.resourceType === "WorkMaterials") {
                    const newMaterialRef = [...prevState.wMaterialsList, newResource];
                    return {
                        "wMaterialsList": newMaterialRef
                    }
                } else if (newResource.resourceType === "Utilities") {
                    const newUtilityRef = [...prevState.utilitiesList, newResource];
                    return {
                        "utilitiesList": newUtilityRef
                    }
                }
            })
        })
    };

    render() {
        const state = {
            bookList: this.state.bookList
        };
        const coursesState = {
            courseList: this.state.courseList
        };
        const documentsState = {
            documentList: this.state.documentList
        };
        const officeState = {
            officeList: this.state.officeList
        };
        const materialState = {
            wMaterialsList: this.state.wMaterialsList
        };
        const utilityState = {
            utilitiesList: this.state.utilitiesList
        };
        const restaurantState = {
            restaurantList: this.state.restaurantList
        };


        const routing = (
            <Router>
                {/*CALENDAR*/}
                <Route path={"/calendar"} exact render={() =>
                    <Calendar events={this.state.eventsList}/>}>
                </Route>

                {/*RESOURCES*/}
                <Route path={"/resources/"} exact render={() =>
                    <OfficeList {...officeState} onNewRequest={this.addRequest}/>}>
                </Route>
                <Route path={"/resources/add"} exact render={() =>
                    <ResourcesAdd onNewResourcesAdded={this.addResource}/>}>
                </Route>
                {/*OFFICE*/}
                <Route path={"/resources/office"} exact render={() =>
                    <OfficeList {...officeState} onNewRequest={this.addRequest}/>}>
                </Route>
                {/*WorkMaterials*/}
                <Route path={"/resources/materials"} exact render={() =>
                    <MaterialList {...materialState} onNewRequest={this.addRequest}/>}>
                </Route>
                {/*Utilities*/}
                <Route path={"/resources/utilities"} exact render={() =>
                    <UtilityList {...utilityState} onNewRequest={this.addRequest}/>}>
                </Route>


                {/*LIBRARY*/}
                <Route path={"/library/"} exact render={() =>
                    <BookList {...state} />}>
                </Route>

                {/*BOOKS*/}
                <Route path={"/library/book"} exact render={() =>
                    <BookList {...state} />}>
                </Route>
                <Route path={"/library/book/:isbn"} component={BookDetails}/>

                <Route path={"/library/add/book"} exact render={() =>
                    <BookAdd onNewBookAdded={this.addBook}/>}>
                </Route>

                {/*COURSES*/}
                <Route path={"/library/courses"} exact render={() =>
                    <CourseList {...coursesState} />}>
                </Route>
                <Route path={"/library/add/courses"} exact render={() =>
                    <CourseAdd onNewCourseAdded={this.addCourse}/>}>
                </Route>

                {/*DOCUMENTS*/}
                <Route path={"/library/documents"} exact render={() =>
                    <DocumentList {...documentsState}/>}>
                </Route>
                <Route path={"/library/add/documents"} exact render={() =>
                    <DocumentAdd onNewDocumentAdded={this.addDocument}/>}>
                </Route>

                {/*FOOD*/}
                <Route path={"/food"} exact render={() =>
                    <Food {...restaurantState}/>}>
                </Route>

                {/*HOME PAGE*/}
                <Route path={"/"} exact render={() =>
                    <Home/>}>
                </Route>

                <Redirect to="/"/>

            </Router>
        );
        return (
            <div className="App">
                {routing}
            </div>
        );
    }
}

export default App;
