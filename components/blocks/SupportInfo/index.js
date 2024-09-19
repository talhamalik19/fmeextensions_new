import React from 'react'
import SupportBox from './SupportBox'

export default function SupportInfo({cards, pageName}) {
    
    let supportInfo = null;
    try{
        supportInfo = cards;
    }catch(e){}

  return (
    <>
    {/* <PageHeader pageName={pageName}/> */}
    <div className="section_padding zero_top">
        <div className="main_container">
            <div className="support_info grid_custom">
            <SupportBox supportInfo={supportInfo}/>
            </div>
        </div>
    </div>
    </>
  )
}
