import React from 'react'

export default function SupportTab({supportTab, activeTab, setActiveTab}) {
  return (
    <>
    <ul className="support_tabs">
        {
            supportTab.map((item) =>
            <li className={`support_tabs_item ${activeTab === item.id ? 'active' :'' }`} key={item.id} onClick={() => setActiveTab(item.id)}>
              <span dangerouslySetInnerHTML={{ __html: item.tabIcon }}></span> {item.title}
              </li>
            )
        }
    </ul>
    
    </>
  )
}
