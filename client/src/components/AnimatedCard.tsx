import {Link} from "react-router-dom";

interface CityProps {
    id?: number;
    cityName?: string;
    cityPhoto?: string | null;
}

export default function AnimatedCard({cityName, cityPhoto}: CityProps) {
    return (
        <div className="card" style={{
            backgroundImage: `url(${cityPhoto})`
        }}>
            <div className="card-content">
                <h2 className="card-title" data-testid="city-list">{cityName}</h2>
                <p className="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, culpa.
                </p>
                <Link to={"/info"} className="button">
                    Learn More
                </Link>
            </div>
        </div>
    )
}

