import TourNavbar from "./TourNavbar";
import TourFooter from "./TourFooter";
import "./style.scss"

const TourLayout = ({ children }) => {
    return (
        <div className="tour-layout">
            <TourNavbar />
            <div className="tour-layout__content">{children}</div>
            <TourFooter />
        </div>
    );
}

export default TourLayout