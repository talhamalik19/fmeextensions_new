
export default function FeatureTabs({ tab, onTabClick, selectedTab, sarabun }) {

  return (
    <div className="prod_feat_tab">
      <div className="main_container">
        <ul className="prod_feat_tab_lst">
          {tab.map((tabs) => (
            <li
              className={`feat_tab_item secondary_title ${sarabun} ${selectedTab === tabs.id ? 'selected' : ''}`}
              key={tabs.id} onClick={() => onTabClick(tabs.id) }
            >
              {/* <ImageBlock image={tabs.tabIcon} />  */}
              <span dangerouslySetInnerHTML={{ __html: tabs.tabIcon }}></span> {tabs.tab}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
