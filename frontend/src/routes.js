import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon/Index';
import Register from './pages/Register/Index';
import Profile  from './pages/Profile/Index';
import NewCase from './pages/NewIndice/Index';

export default function Routes() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon}/>
            <Route path="/register" component={Register}/>  

            <Route path="/profile" component={Profile} />
         
            <Route path="/indice/new" component={NewCase} />
        </Switch>
    </BrowserRouter>
    );
}

