import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Repositories} from "../componenets/repositories";
import {NoPage} from "../componenets/NoPage";
import {RepositoryInfo} from "../componenets/RepositoryInfo";

//routes for app
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index element={<Repositories/>}/>
                    <Route path="/:owner/:repo" element={<RepositoryInfo/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

