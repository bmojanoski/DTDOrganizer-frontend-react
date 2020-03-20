import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'

// Components
import Header from "../Header/Header"

import DTDService from '../../repository/axiosConsultationsRepository';
import BookList from '../Library/Books/BookList';
import BookDetails from "../Library/Books/BookDetails";
import BookAdd from "../Library/Books/BookAdd";
import CourseList from "../Library/Courses/CoursesList";
import DocumentList from "../Library/Documents/DocumentList";
import CourseAdd from "../Library/Courses/CourseAdd";

import DocumentAdd from "../Library/Documents/DocumentAdd";

import LibraryMenu from "../Library/Menu/Menu";
import ResourcesMenu from "../Resources/Menu/ResourcesMenu";
import OfficeList from "../Resources/Office/OfficeList";
import MaterialList from "../Resources/WorkMaterials/MaterialList";
import UtilityList from "../Resources/Utilities/UtilityList";
import ResourcesAdd from "../Resources/ResourcesAdd";
import Calendar from "../Calendar/Calendar";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            courseList: [],
            documentList: [],
            officeList:[],
            wMaterialsList:[],
            utilitiesList:[]
        }
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCourses();
        this.loadDocuments();
        this.loadOffice();
        this.loadWorkMaterials();
        this.loadUtilities();

    }

    //BOOKS
    loadBooks = () => {
        DTDService.fetchBooks().then((response) => {
            this.setState({
                bookList: response.data
            });
        });
    };
    addBook = (book) => {
        DTDService.addBook(book).then((response) => {
            const newBook = response.data;
            this.setState((prevState) => {
                const newBookRef = [...prevState.bookList, newBook];
                return {
                    "bookList": newBookRef
                }
            })
        })
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
        DTDService.addRequest(request);
    };
    addResource = (resource) => {
        DTDService.addResource(resource).then((response) => {
            const newResource = response.data;
            this.setState((prevState) => {
                if(newResource.resourceType === "Office"){
                    const newOfficeRef = [...prevState.officeList, newResource];
                    return {
                        "officeList": newOfficeRef
                    }
                }else if(newResource.resourceType === "WorkMaterials"){
                    const newMaterialRef = [...prevState.wMaterialsList, newResource];
                    return {
                        "wMaterialsList": newMaterialRef
                    }
                }else if(newResource.resourceType === "Utilities"){
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

        const routing = (
            <Router>
                <Header/>

                {/*CALENDAR*/}
                <Route path={"/calendar/"} exact render={() =>
                    <Calendar />}>
                </Route>

                {/*RESOURCES*/}
                <Route path={"/resources/"} exact render={() =>
                    <ResourcesMenu />}>
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
                    <LibraryMenu />}>
                </Route>

                {/*BOOKS*/}
                <Route path={"/library/book"} exact render={() =>
                    <BookList {...state} />}>
                </Route>
                <Route path={"/library/book/:isbn"} exact render={() =>
                    <BookDetails/>}>
                </Route>
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
                <Redirect to="/calendar" />

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
