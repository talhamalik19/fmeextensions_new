
import BdCrum from '../PageHeader/BdCrum'

export default function BlogHeader({ pageName, title }) {
    return (
        <>
            <div className="main_container">

                <div className="blog_head">
                    <BdCrum pageName={pageName} />
                    <h2 className="primary_title">{title}</h2>
                </div>
            </div>
        </>
    )
}
