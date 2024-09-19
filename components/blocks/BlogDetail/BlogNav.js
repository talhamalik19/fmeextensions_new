import React from 'react'

export default function BlogNav() {
    return (

        <div className="main_container">
            <div className="blog_nav">
                <ul className='blog_nav_link'>
                    <li className='prev'>
                        <a href="">
                            Previous: <span>Blog Name</span>
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z" /></svg>
                            </div>
                        </a>
                    </li>
                    <li className='next'>
                        <a href="">
                            Next: <span>Blog Name for testing purpose to see how it goes in responsive</span>
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M8.75 1.25L7 3.125L16.25 12.5L7 21.875L8.75 23.75L20 12.5L8.75 1.25Z" fill="#141414" />
                                </svg>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
