import SectionHead from "@/components/global/SectionHead";
import MagentoImageSlider from "./MagentoImageSlider";
import dlv from "dlv";

const MagentoGalleryFeature = ({ product,sarabun }) => {
    const productGallery = dlv(product, 'media_gallery')
    const customGallery = dlv(product, 'custom_gallery')
    return (
        <>
            <div className="section_padding" style={{background: 'linear-gradient(180deg, #FFFFFF -25.32%, #FFF7F2 100%)'}}>
                <div className="main_container">
                    <div className="mgt_feat">
                        { (dlv(product,'gallery_title') || dlv(product,'gallery_description')) && <SectionHead title={dlv(product,'gallery_title')} desc={dlv(product,'gallery_description')} sarabun={sarabun}/>}
                        <MagentoImageSlider customGallery={customGallery} sarabun={sarabun}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MagentoGalleryFeature;