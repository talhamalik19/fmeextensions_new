import dlv from "dlv";
import ProductDiscount from "./ProductDiscount";

const ProdComboDeal = ({ product, closeModal, globalMagento, sarabun }) => {
    return (
        dlv(product,'upsell_products') && dlv(product,'upsell_products.length') > 0 && <>
            <div className="section_bg">
                <div className="section_padding">
                    <div className="main_container">
                        <div className="prod_combo">
                        {product?.combo_discount_value && <h2 className={`${sarabun} primary_title`}>Pick a Combo Deal with <span className="combo_prod_price">{product?.combo_discount_value}%</span> Discount</h2>}
                            <div className="prod_combo_inner">
                                <ProductDiscount closeModal={closeModal} product={product} globalMagento={globalMagento} sarabun={sarabun}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProdComboDeal;