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
                <h2 className="card-title">{cityName}</h2>
                <p className="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, culpa.
                </p>
                <a href="#" className="button">
                    Learn More
                </a>
            </div>
        </div>
    )
}

