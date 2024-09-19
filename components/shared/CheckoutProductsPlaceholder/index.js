
export default function CheckoutProductsPlaceholder() {
    return (
        <svg className="svg-placeholder-heading" xmlns="http://www.w3.org/2000/svg" width="100%" height="500px">
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
            <rect fill="url(#myGradient)" width="10%" height="50px" x="10px" y="10px" />
            <rect fill="url(#myGradient)" width="20%" height="15px" x="120px" y="20px" />
            <rect fill="url(#myGradient)" width="20%" height="20px" x="120px" y="60px" />
            <rect fill="url(#myGradient)" width="20%" height="20px" x="450px" y="30px" />
            <rect fill="url(#myGradient)" width="100%" height="120px" x="10px" y="120px" />
            <rect fill="url(#myGradient)" width="20%" height="20px" x="10px" y="310px" />
            <rect fill="url(#myGradient)" width="30%" height="20px" x="10px" y="370px" />
            <rect fill="url(#myGradient)" width="95%" height="40px" x="10px" y="420px" rx={25} ry={25} />
        </svg>
    )
}
