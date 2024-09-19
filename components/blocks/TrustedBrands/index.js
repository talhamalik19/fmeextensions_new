import SectionHead from "@/components/global/SectionHead";
import { imageLoader } from "@/components/shared/imageLoader";
import Image from "next/image";
import Link from "next/link";

const TrustedBrands = ({ pageName, heading,text, button, image, sarabun }) => {

    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    <div className="trusted_brands">
                        {heading && <SectionHead title={heading} desc={text} cta={button} sarabun={sarabun}/>}
                        <ul className="trusted_brand_inner">
                            {
                                image.map((image, index) =>
                                    <li key={`brand-image-${index}`}>
                                        <Image
                                            loader={imageLoader}
                                            src={image.url}
                                            alt={`${image.alt}`}
                                            width={200}
                                            height={52}
                                            style={{height:'auto', width:'100%', maxWidth:'auto', margin:'auto'}}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                        {
                            pageName === 'Our Partners' ?
                                <div className="section_cta">
                                    <Link href={'partnercatalog'} className=" primary_cta">Check out the Complete List of Partners </Link>
                                </div> : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default TrustedBrands;