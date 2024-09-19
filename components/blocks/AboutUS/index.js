import AboutusBanking from "../AboutUS/AboutusBanking";
import MeetTeam from "./MeetTeam";
import FmeExtension from "./FmeExtension";
import AboutusCU from "./AboutusCU";
import HeroInfo from "../HeroInfo";
import ServicesBanner from "../ServicesDetail/ServicesBanner";
import TwoCol from "../TwoCol";
import { useEffect, useState } from "react";
import dlv from "dlv";
import { customBlocks } from "@/pages/api/page";

export default function Aboutus({ cards, pageName, sarabun }) {


  const [blockContent, setBlockContent] = useState([]);
  const fetchBannerBlock = async () => {
    const results = await customBlocks('blocks-about_banner');
    
    // Api Data fetch for banner
    try{
      setBlockContent(JSON.parse(results.data.blocks_data)[0])
    } catch(e){}
    // if (results.data.custom_banners) {
    //   setBlockContent((prev) => [...prev, ...results.data.custom_banners])
    // }
  };

  useEffect(() => {
    fetchBannerBlock();
  }, [pageName]);
  
  // const aboutUsBanner = blockContent.find(item => item.banner_identifier === 'About-us')

  let aboutTwoCol = null;
  let AboutCompMang = null;
  let ourTeam = null;
  let FmeExt = null;
  let contactBlock = null;
  try{
    aboutTwoCol = cards[0];
    AboutCompMang = cards[1];
    ourTeam = cards[2];
    FmeExt = cards[3];
    contactBlock = cards[5];
  }catch(e){}

  const heroContent = {
    heading: dlv(cards,'4.heading'),
    text: dlv(cards,'4.text'),
    button2: dlv(cards,'4.button2.0'),
    section_bg: 'true',
}


  return (
    <div className="aboutus_wrapper">
      <ServicesBanner pageName={pageName} banner={blockContent} sarabun={sarabun}/>
      <TwoCol pageName={pageName} aboutTwoCol={aboutTwoCol} sarabun={sarabun}/>
      <AboutusBanking AboutCompMang={AboutCompMang} sarabun={sarabun}/>
      <MeetTeam teamimg={ourTeam} itemimage={dlv(ourTeam,'image')} sarabun={sarabun} teamClass="section_team" />
      <FmeExtension FmeExt={FmeExt} sarabun={sarabun}/>
      <HeroInfo blockContent={heroContent} secClass="about_hero" sarabun={sarabun}/>
      <AboutusCU contactusblock={contactBlock} sarabun={sarabun}/>
    </div>
  );
}
