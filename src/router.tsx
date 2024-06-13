import { Redirect, Route } from 'dreamland-router';
import Home from './routes/home';
import Credits from './routes/credits'
import PageNotFound from './routes/pagenotfound';
export const Router = (
    <Route path="/">
        <Route path="" show={<Home />} />
        <Route path="credits" show={<Credits />} />
        <Route regex path=".*" show={<PageNotFound />} />
    </Route>
).$;
