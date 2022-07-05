import './MainPage.css'

function MainPage({ heroDataGrid }) {
    return (
        <section className='hero-grid'>
            <div className='parent-box'>
                {heroDataGrid.map(hero =>
                    <a href={`/hero/${hero.id}`}
                        className='hero-img'
                        key={hero.id}
                        style={{
                            backgroundImage: `url(https://api.opendota.com${hero.img})`
                        }}
                        alt={hero.localized_name}
                    >
                        {hero.localized_name}
                    </a>
                )}
            </div>
        </section >
    )
}

export default MainPage