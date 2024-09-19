
import CatFilter from './CatFilter';


const ProductFilter = () => {
    const filterCat = [
        { id: 1, cat: 'All', count: '150' },
        { id: 2, cat: 'Catalog', count: '22' },
        { id: 3, cat: 'Administration', count: '09' },
        { id: 4, cat: 'Image & Media', count: '08' },
        { id: 5, cat: 'Content Management', count: '04' },
        { id: 6, cat: 'Cart & Checkout', count: '15' },
        { id: 7, cat: 'Product Pricing', count: '09' },
        { id: 8, cat: 'Legal', count: '01' },
        { id: 9, cat: 'Sales & Promotin', count: '14' },
        { id: 10, cat: 'Website Security Geoip', count: '15' },
        { id: 11, cat: 'Speed Optimization', count: '02' },
        { id: 12, cat: 'User Experience', count: '07' },
    ]
    return (
        <>
            <div className="main_container">
                <div className="filter_main">
                    <div className='filter_icon'></div>
                    <div className="product_filter">
                        <div className="filter_option">
                            <div className='selection'>
                                <label htmlFor="showing">Showing</label>
                                <select name="" id="showing" className='showing_opt'>
                                    <option value="15" selected>15</option>
                                    <option value="30" >30</option>
                                    <option value="50" >50</option>
                                </select>
                            </div>
                            <div className="selection">
                                <select name="" id="" className='sort_opt'>
                                    <option value="best seller" selected>Best Seller</option>
                                    <option value="latest seller" >Latest Seller</option>
                                    <option value="featured seller" >Featured Seller</option>
                                </select>
                            </div>
                        </div>
                        <CatFilter filter={filterCat} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductFilter;