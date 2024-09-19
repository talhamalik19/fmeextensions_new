import React from 'react'

export default function Badge({ badgeText, badgeClass }) {
    const badges = [{ 18: 'Top Rated' }, { 19: 'Best Sellers' }];
    const badge = badges.find(badge => badge[badgeText]);
    const badgeContent = badge ? badge[badgeText] : null;
    
    return (
        badgeText &&
        <div className={`badge ${badgeClass}`}>
            <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M5.64555 24.1297C5.04243 24.4391 4.35805 23.8969 4.47993 23.2047L5.7768 15.8141L0.272115 10.5703C-0.241948 10.0797 0.0252397 9.18282 0.714302 9.08594L8.36743 7.99844L11.7799 1.2375C12.0877 0.628128 12.9206 0.628128 13.2284 1.2375L16.6409 7.99844L24.294 9.08594C24.9831 9.18282 25.2502 10.0797 24.7346 10.5703L19.2315 15.8141L20.5284 23.2047C20.6502 23.8969 19.9659 24.4391 19.3627 24.1297L12.5018 20.6047L5.64555 24.1297Z" fill="#FF7425" />
                </svg>
            </div>
            <div className="badge_text">{badgeContent}</div>
        </div>
    )
}
