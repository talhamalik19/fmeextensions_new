import { imageLoader } from "@/components/shared/imageLoader";
import dlv from "dlv";
import Image from "next/image";
export default function FmeExtension({ FmeExt,sarabun }) {
  const FmeExtension1 = "images/FmeExtension1.png";
  const FmeExtension2 = "images/FmeExtension2.png";
  return (
    <div className='section_padding '>
      <div className="main_container ">
        <div className=" about_us_fmeExtension">
          <div className="fmeExtensionHeading">
            <h2 className={`${sarabun} primary_title`}> {dlv(FmeExt,'heading')} </h2>
          </div>
          <div className='Fme_extension grid_custom'>
            {
              FmeExt.image.map((img) =>
                <Image
                  loader={imageLoader}
                  src={dlv(img, 'url')}
                  alt={`${dlv(img, 'alt')}`}
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              )
            }
          </div>

          <div className='Fme_extension_desp'>
            <p className='primary_text'>{dlv(FmeExt,'text')}</p>
          </div>
        </div>
      </div>
    </div>

  )
}
