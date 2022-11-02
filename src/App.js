import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from "react-router-dom";
import {history} from "./_helpers";
import {alertActions} from './_actions';
import LoginPage  from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import TopBar from "./_components/TopBar/TopBar";
import SideBar from "./_components/SideBar/SideBar";
import HomePage from "./HomePage/HomePage";
import OrganizationPage from "./Organization/OrganizationPage";
import OrganizationForm from "./Organization/OrganizationForm";
import DepartmentPage from "./Department/DepartmentPage";
import DepartmentForm from "./Department/DepartmentForm";
import CategoryForm from "./Category/CategoryForm";
import CategoryPage from "./Category/CategoryPage";
import TokenTypePage from "./TokenType/TokenTypePage";
import TokenTypeForm from "./TokenType/TokenTypeForm" ;
import ProcessStagePage from "./ProcessStage/ProcessStagePage";
import ProcessStageForm from "./ProcessStage/ProcessStageForm";
import CounterPage from "./Counter/CounterPage";
import CounterForm from "./Counter/CounterForm";
import CounterProcessMapping from "./Counter/CounterProcessMapping";

function App() {
    const user = useSelector(state => state.authentication.user);
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();


    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <>
            <TopBar/>
            <div className="jumbotron">
                <div className="row">
                    <div className="col-2">
                        <SideBar/>
                    </div>
                    <div className="col-10 p-3">
                        <div className="col-md-12">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <BrowserRouter>
                                <Routes>
                                    <Route exact path="/" element={user ? <HomePage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/home" element={user ? <HomePage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/organization" element={user ? <OrganizationPage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/org-add" element={user ? <OrganizationForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/org-edit" element={user ? <OrganizationForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/department" element={user ? <DepartmentPage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/dept-add" element={user ? <DepartmentForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/dept-edit" element={user ? <DepartmentForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/category" element={user ? <CategoryPage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/cat-add" element={user ? <CategoryForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/cat-edit" element={user ? <CategoryForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/token-type" element={user ? <TokenTypePage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/token-type-add" element={user ? <TokenTypeForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/token-type-edit" element={user ? <TokenTypeForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/process-stage" element={user ? <ProcessStagePage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/process-stage-add" element={user ? <ProcessStageForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/process-stage-edit" element={user ? <ProcessStageForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/counters" element={user ? <CounterPage/> : <Navigate to="/login" />}/>
                                    <Route exact path="/counter-add" element={user ? <CounterForm/> : <Navigate to="/login" />}/>
                                    <Route exact path="/counter-edit" element={user ? <CounterForm/> : <Navigate to="/login" />}/>
                                    <Route exaxt path="/counter-process-map" element={user ? <CounterProcessMapping/> : <Navigate to="/login" />}/>

                                    <Route path="/login" element={<LoginPage/>}/>
                                    <Route path="/register" element={<RegisterPage/>}/>
                                    <Route
                                        path="*"
                                        element={
                                            <main style={{padding: "1rem"}}>
                                                <p>There's nothing here!</p>
                                            </main>
                                        }
                                    />
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
