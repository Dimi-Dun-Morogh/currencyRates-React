import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './layout.scss';
import { AddClass } from '../../hoc/AddClass';
import { Header } from '../header/Header';
import { Home } from '../../pages/home/Home';
import { Sidebar } from '../sidebar/Sidebar';
import { Calc } from '../../pages/calc/Calc';
import { Sample } from '../../pages/sample/Sample';
import { Info } from '../../pages/info/Info';
import { RateContext } from '../../context/RateContext';

const Layout = () => {
  const { state } = useContext(RateContext);
  return (
    <>
      <Header />
      <div className="content">
        <div className="routes">
          {state.auth ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/calc" render={() => <Calc />} />
              <Route exact path="/sample" render={() => <Sample />} />
              <Route exact path="/info" render={() => <Info />} />
            </Switch>
          ) : (
            <Route exact path="/" component={Home} />
          )}
        </div>

        <Sidebar />
      </div>
    </>
  );
};

export default AddClass(Layout, 'layout');
