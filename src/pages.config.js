import AvailablePieces from './pages/AvailablePieces';
import Contact from './pages/Contact';
import Home from './pages/Home';
import PastPieces from './pages/PastPieces';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AvailablePieces": AvailablePieces,
    "Contact": Contact,
    "Home": Home,
    "PastPieces": PastPieces,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};