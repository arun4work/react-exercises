import React, {Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from './components/layout/Layout';
// import QuoteDetail from './pages/QuoteDetail';
// import AllQuotes from './pages/AllQuotes';
// import NewQuote from './pages/NewQuote';
// import PageNotFound from './pages/PageNotFound';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));

function App() {
    return (
        <Layout>
            <Suspense
                fallback={
                    <div className='centered'>
                        <LoadingSpinner />
                    </div>
                }
            >
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/quotes' />
                    </Route>
                    <Route path='/quotes' exact>
                        <AllQuotes />
                    </Route>
                    <Route path='/quotes/:quoteId'>
                        <QuoteDetail />
                    </Route>
                    <Route path='/new-quote'>
                        <NewQuote />
                    </Route>
                    <Route path='*'>
                        <PageNotFound />
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;
