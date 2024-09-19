
export default function AccountAddressPlaceholder() {
    return (
        <svg className="svg-placeholder-heading" xmlns="http://www.w3.org/2000/svg" width="100%" height="350px">
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
            <rect fill="url(#myGradient)" width="50%" height="350px" rx='20px' ry='20px' />
            <rect fill="url(#myGradient)" width="45%" height="350px" x='55%' rx='20px' ry='20px'  />
            
        </svg>
    )
}
