import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Hero.css'
function Hero({ heroDataGrid }) {
    const [heroLore, setHeroLore] = useState([])
    const params = useParams()
    useEffect(() => {
        fetch(`https://api.opendota.com/api/constants/hero_lore`)
            .then(res => res.json())
            .then(data => {
                setHeroLore(data)
            })
    }, [])

    return (
        <section className="hero-profile-main" >
            {
                heroDataGrid.filter(hero => (hero.id === Number(params.id))).map(filteredHero => (
                    <>
                        <section className="hero-overview">
                            <div className="hero-summary">
                                <h1 id='main-hero-heading'>{filteredHero.localized_name}</h1>
                                <p id="lore">{heroLore[`${filteredHero.name.split('_').length === 5 ? filteredHero.name.split('_').slice(-2).join('_') : filteredHero.name.split('_').slice(-1)}`]}</p>
                                <h3>Attack Type: {filteredHero.attack_type}</h3>
                                <h3>Primary Attributes: {filteredHero.primary_attr}</h3>
                            </div>
                            <section className="hero-preview">
                                <video
                                    className="hero-video"
                                    autoPlay
                                    preload="auto"
                                    loop
                                    playsInline
                                >
                                    <source type="video/webm" src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${filteredHero.name.split('_').length === 5 ? filteredHero.name.split('_').slice(-2).join('_') : filteredHero.name.split('_').slice(-1)}.webm`}></source>
                                </video>
                            </section>
                        </section>
                        <div className='detail-bar'>
                            <div className="image-attribute">
                                <img src={`https://api.opendota.com${filteredHero.img}`} alt={filteredHero.localized_name} />
                                <p id="hp-bar">Starting HP {filteredHero.base_health + (filteredHero.base_str * 20)}</p>
                                <p id="mana-bar">Starting Mana {filteredHero.base_mana + (filteredHero.base_int * 12)}</p>
                            </div>
                            <div className="attribute-bar">
                                <strong>ATTRIBUTES</strong><br />
                                <div className='attribute-divs'>
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png" alt="strength-icon" />
                                    <p> {filteredHero.base_str} <span className='level-att'>+ {filteredHero.str_gain}</span></p>
                                </div>
                                <div className='attribute-divs'>
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png" alt="agility-icon" />
                                    <p> {filteredHero.base_agi} <span className='level-att'>+ {filteredHero.agi_gain}</span></p>
                                </div>
                                <div className='attribute-divs'>
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png" alt="inteligence-icon" />
                                    <p> {filteredHero.base_int} <span className='level-att'>+ {filteredHero.int_gain}</span></p>
                                </div>
                            </div>
                            <div className="roles">
                                <strong>ROLES</strong>
                                <ul className='role'>
                                    {filteredHero.roles.map((role, index) => (
                                        <li className="role-li" key={index}>{role}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="attack-bar">
                                <strong>ATTACK</strong>
                                <div className="attack-details">
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_damage.png" alt="attack-icon" />
                                    <p>Attack: {filteredHero.base_attack_min
                                        + (filteredHero.primary_attr === 'str' ? filteredHero.base_str : 0) + (filteredHero.primary_attr === 'agi' ? filteredHero.base_agi : 0) + (filteredHero.primary_attr === 'int' ? filteredHero.base_int : 0)
                                    } - {filteredHero.base_attack_max + (filteredHero.primary_attr === 'agi' ? filteredHero.base_agi : 0) + (filteredHero.primary_attr === 'int' ? filteredHero.base_int : 0)}</p>
                                </div>
                                <div className="attack-details">
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_time.png" alt="attack-rate-icon" />
                                    <p>Attack Rate: {filteredHero.attack_rate}</p>
                                </div>
                                <div className="attack-details">
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_range.png" alt="attack-range-icon" />
                                    <p>Attack Range: {filteredHero.attack_range}</p>
                                </div>
                            </div>
                            <div className="defense-bar">
                                <strong>DEFENSE</strong>
                                <div className="defense-details">
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_armor.png" alt="armor-icon" />
                                    <p>Defense: {Math.round(filteredHero.base_armor + (filteredHero.base_agi * 0.167))}</p>
                                </div>
                                <div className="defense-details">
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_magic_resist.png" alt="magic-resist-icon" />
                                    <p>Magic Resistance: {filteredHero.base_mr}%</p>
                                </div>
                            </div>
                            <div className="mobility-bar">
                                <strong>MOBILITY</strong>
                                <div className="mobility-details">
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_movement_speed.png" alt="movement-speed-icon" />
                                    <p>Movement Speed: {filteredHero.move_speed}</p>
                                </div>
                                <div className="mobility-details">
                                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_turn_rate.png" alt="turn-rate-icon" />
                                    <p>Turn Rate: {filteredHero.turn_rate === null ? 0.6 : filteredHero.turn_rate}</p>
                                </div>


                            </div>
                        </div>
                    </>
                ))
            }


        </section >
    )
}

export default Hero
