/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import ApolloWrapper from 'containers/ApolloWrapper';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Footer from 'components/Footer';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
`;

export default function App() {
  return (
    <AppWrapper>
      <ApolloWrapper>
        <Helmet
          titleTemplate="%s"
          defaultTitle="University of Victoria Caving Club"
        >
          <meta
            name="description"
            content="The University of Victoria Caving Club"
          />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:slug" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </ApolloWrapper>
    </AppWrapper>
  );
}
