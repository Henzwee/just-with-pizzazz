import Home from './pages/Home';
import AvailablePieces from './pages/AvailablePieces';
import PastPieces from './pages/PastPieces';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "AvailablePieces": AvailablePieces,
    "PastPieces": PastPieces,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};