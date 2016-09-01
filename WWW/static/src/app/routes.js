import App from './app';

import About from './handlers/About';
import Brief from './handlers/Brief';
import Blog from './handlers/Blog';
import ClientList from './handlers/ClientList';
import Contacts from './handlers/Contacts';
import Home from './handlers/Home';
import PortfolioList from './handlers/PortfolioList';
import Support from './handlers/Support';
import PortfolioView from './handlers/PortfolioView';
import ServiceList from './handlers/ServiceList';
import ServiceView from './handlers/ServiceView';

export default {
    Home: {path: '/', component: Home, wrapper: App},
    About: {path: '/about/', component: About, wrapper: App},
    Blog: {path: '/blog/', component: Blog, wrapper: App},
    ClientList: {path: '/clients/', component: ClientList, wrapper: App},
    ServiceList: {path: '/services/', component: ServiceList, wrapper: App},
    ServiceView: {path: '/services/:url/', component: ServiceView, wrapper: App},
    PortfolioList: {path: '/portfolio/', component: PortfolioList, wrapper: App},
    PortfolioView: {path: '/portfolio/:slug/', component: PortfolioView, wrapper: App},
    Support: {path: '/support/', component: Support, wrapper: App},
    Contacts: {path: '/contacts/', component: Contacts, wrapper: App}
}