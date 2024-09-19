
export default function BreadCrumPlaceholder() {
    return (
        <div className="pg_header">
            <div className="page_info">
                <svg className="svg-placeholder-heading" xmlns="http://www.w3.org/2000/svg" width="100%" height="100px">
                    <defs>
                        <linearGradient id="myGradient" gradientTransform="rotate(20)">
                            <stop offset="5%" stopColor="#eee">
                                <animate attributeName="stop-color" values="#EEEEEE; #CCCCCC; #EEEEEE" dur="2s" repeatCount="indefinite"></animate>
                            </stop>
                            <stop offset="95%" stopColor="#f6f6f6">
                                <animate attributeName="stop-color" values="#EEEEEE; #DDDDDD; #EEEEEE" dur="3s" repeatCount="indefinite"></animate>
                            </stop>
                        </linearGradient>
                    </defs>
                    <rect fill="url(#myGradient)" width="85%" height="30px" x="10px" y="10px" />
                    <rect fill="url(#myGradient)" width="75%" height="15px" x="10px" y="50px" />
                </svg>
            </div>
            <div className='pg_desc'>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <defs>
                        <linearGradient id="myGradient" gradientTransform="rotate(20)">
                            <stop offset="5%" stopColor="#eee">
                                <animate attributeName="stop-color" values="#EEEEEE; #CCCCCC; #EEEEEE" dur="2s" repeatCount="indefinite"></animate>
                            </stop>
                            <stop offset="95%" stopColor="#f6f6f6">
                                <animate attributeName="stop-color" values="#EEEEEE; #DDDDDD; #EEEEEE" dur="3s" repeatCount="indefinite"></animate>
                            </stop>
                        </linearGradient>
                    </defs>
                    <rect fill="url(#myGradient)" width="85%" height="15" x="10" y="10" />
                    <rect fill="url(#myGradient)" width="85%" height="15" x="10" y="35" />
                    <rect fill="url(#myGradient)" width="85%" height="15" x="10" y="60" />
                    <rect fill="url(#myGradient)" width="85%" height="15" x="10" y="85" />
                    <rect fill="url(#myGradient)" width="20%" height="15" x="10" y="120" />
                </svg>
            </div>
        </div>
    )
}
