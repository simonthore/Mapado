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
                <a href="/info" className="button">
                    Learn More
                </a>
            </div>
        </div>
    )
}

