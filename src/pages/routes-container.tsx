import { Route, Routes, useLocation } from "react-router-dom";
import {HomePage} from './home';
import { NotFound404 } from "./not-found";
import { BookModal } from "./book-modal";
import BookPage from "./book";


export default function RoutesContainer() {
    const location = useLocation();
    const locationState = location.state as {background?: Location };
    const background = locationState && locationState.background;
    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/books/:id" element={<BookPage />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
            {background && <Routes>
                <Route path="books/:id" element={<BookModal />} />
            </Routes>}
        </>
    )
}