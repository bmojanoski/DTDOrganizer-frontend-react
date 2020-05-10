import React, {Component} from 'react';
import Header from "../Header/Header";


class About extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="bg-light">
                    <div className="container py-5">
                        <div className="row h-100 align-items-center py-5">
                            <div className="col-lg-7">
                                <h1 className="display-4">About us page</h1>
                                <span className="text-small text-muted mb-0">Веб решението кое е резултат на овој проект има за цел да го олесни и
                                    организира на подобар начин целосното функционирање внатре во компанијата на дневна база. Се работи за Intranet веб апликација, која е респонсивна и може да се користи и од мобилни телефони. Идејата произлегува од мое искуство и искуство на мои колеги со кои ја добивме оваа идеја преку работа во реална компанија и чувството на недостаток од организација во поголемиот дел од компаниите на секојдневните (тривијални) задачи, обврски и цели.
                                </span>
                                <h1></h1>
                                <span className="text-small text-muted mb-0">Поголемиот дел од организацијата е насочена кон подобра и поефикасна изработка на софтвер, додека оптимизација на „животниот стил“ во компанијата недостасува. Овој софтвер како крајна цел има да го подобри овој „животен стил“ односно да овозможи подобра комуникација во самата компанија помеѓу нејзините вработени на едно повисоко ниво од професионалното.
                                </span>
                            </div>
                            <div className="col-lg-5 d-none d-lg-block"><img
                                src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png" alt=""
                                className="img-fluid"/></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white py-5">
                    <div className="container py-5">
                        <h1 className="display-5">Application components</h1>
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-6 order-2 order-lg-1"><i
                                className="fa fa-calendar fa-2x mb-3 text-primary"/>
                                <h2 className="font-weight-light">Calendar</h2>
                                <p className="font-italic text-muted mb-4">
                                    Организатор во вид на календар за конференциска сала, отсуство и
                                    настани/празници - оваа компонента служи како централно место за впишување на сите настани во компанијата. Календарот е готова open source компонента - FullCalendar.io
                                </p>

                            </div>
                            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img
                                src="https://image.freepik.com/free-vector/time-management-concept-landing-page_52683-19462.jpg" alt=""
                                className="img-fluid mb-4 mb-lg-0"/></div>
                        </div>
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-5 px-5 mx-auto"><img
                                src="https://image.freepik.com/free-vector/contact-us-concept-landing-page_52683-12191.jpg " alt=""
                                className="img-fluid mb-4 mb-lg-0"/></div>
                            <div className="col-lg-6"><i className="fa fa-book fa-2x mb-3 text-primary"/>
                                <h2 className="font-weight-light">Library</h2>
                                <p className="font-italic text-muted mb-4">
                                    Библиотека за ресурси за едукација – На секој корисник, библиотеката ќе му овозможи
                                    централно место за добивање на ресурси за учење од различни извори и во различни формати.
                                    Ресурсите кои можат да се пристапат преку оваа функционалност на системот се
                                    следните:
                                </p>
                                <h6></h6>
                                <p className="font-italic text-muted mb-4">
                                    Книги -
                                    На системот ќе бидат прикажани сите книги кои физички се достапни како ресурс
                                    во компанијата. За секоја од книгите се наведени неколку полиња каде што
                                    корисникот ќе може да прочита име, опис и достапност на книгата.
                                </p>
                                <h6></h6>
                                <p className="font-italic text-muted mb-4">

                                    Курсеви -
                                    Курсевите претставуваат видео материјали кои корисниците ќе можат да ги
                                    преземат.
                                    </p>
                                <h6></h6>
                                <p className="font-italic text-muted mb-4">
                                    Документи -
                                    Документите се од информативен карактер преку кои вработените можат да стекнат дополнително знаење.
                                </p>
                            </div>
                        </div>
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-6 order-2 order-lg-1"><i
                                className="fa fa-file fa-2x mb-3 text-primary"/>
                                <h2 className="font-weight-light">Resources</h2>
                                <p className="font-italic text-muted mb-4">
                                    Оваа функционалност ќе им овозможи на вработените полесен
                                    начин за известување на одговорните лица дека имаат потреба од некакви канцелариски
                                    ресурси. Со чекирање на ресурсите и клик на копчето испрати,
                                    надлежните добиваат соодветна mail порака.
                                 </p>
                            </div>
                            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img
                                src="https://image.freepik.com/free-vector/contact-concept-landing-page_23-2148252706.jpg" alt=""
                                className="img-fluid mb-4 mb-lg-0"/></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-5 px-5 mx-auto"><img
                                src="https://image.freepik.com/free-vector/flat-design-co-workers-concept-landing-page_23-2148296956.jpg" alt=""
                                className="img-fluid mb-4 mb-lg-0"/></div>
                            <div className="col-lg-6"><i className="fa fa-apple fa-2x mb-3 text-primary"/>
                                <h2 className="font-weight-light">Food</h2>
                                <p className="font-italic text-muted mb-4">Организаторот за оброци ќе овозможи полесна организација на
                                    процесот на набавка на храна за вработените. Со тоа значително ќе се намали времето и
                                    енергијата потрошена при комуникацијата и изборот на нарачка.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-light py-5">
                    <div className="container py-5">
                        <div className="row text-cente justify-content-center">
                            <div className="col-xl-3 col-sm-6 mb-5">
                                <div className="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 className="mb-0">Github repo</h5>
                                    <ul className="social mb-0 list-inline mt-3">
                                        <li className="list-inline-item">Frontend -
                                            <a href="https://github.com/bmojanoski/DTDOrganizer-frontend-react" className="social-link" target="_blank" rel="noopener noreferrer"><i
                                            className="fa fa-github"/></a></li>
                                        <li className="list-inline-item">Backend - <a href="https://github.com/bmojanoski/DTDOrganizer-java" className="social-link" target="_blank" rel="noopener noreferrer"><i
                                            className="fa fa-github"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-5">
                                <div className="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 className="mb-0">More documentation</h5>
                                    <ul className="social mb-0 list-inline mt-3">
                                        <li className="list-inline-item">
                                            <a href="https://drive.google.com/drive/folders/1_g4_7Q0pc_YjtvvQt6ynYcxCRioo4-71?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm px-5 shadow-sm">Learn
                                                More</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default About