import dynamic from 'next/dynamic';
import { imageLoader } from "@/components/shared/imageLoader";
import dlv from "dlv";
import Image from "next/image";
const DynamicInnerHtml = dynamic(() => import('@/components/shared/InnerHtml'), {
  ssr: false,
});


export default function AboutusBanking({ AboutCompMang, sarabun }) {

  // const founder = {
  //   title: 'Banking is foundational to every company, but most people have low expectations for it by default.',
  // }

  // const ZeeshanKhalid = "images/ZeeshanKhalid(CEO).png";
  // const kamran = "images/kamran.png";
  // const tahir = "images/tahir.png";
  return (

    <div className='section_padding banking_bg'>
      <div className="main_container ">
        <div className=" about_us_Banking">
          <div className="bankingHeading">
            <h2 className={`${sarabun} primary_title`}>{dlv(AboutCompMang,'heading')}</h2>
          </div>
          <div className="banking_founder grid_custom">
            <div>
              <Image
                loader={imageLoader}
                src={dlv(AboutCompMang.image[2],'url')}
                alt={`${dlv(AboutCompMang.image[2],'alt')}`}
                width={480}
                height={620}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
           <div>
            {dlv(AboutCompMang,'title') && <DynamicInnerHtml content={dlv(AboutCompMang,'title')} />}
           </div>
           {dlv(AboutCompMang,'image') && dlv(AboutCompMang,'image').map((image, index)=>(
              index !== 2 && <div key={`ceo-${index}`}>
              <Image
                loader={imageLoader}
                src={dlv(image,'url')}
                alt={`${dlv(image,'alt')}`}
                width={480}
                height={620}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            ))}
          </div>

          <div className="bankingHeading">
            <h2 className={`${sarabun} primary_title`}>{dlv(AboutCompMang,'text')}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
