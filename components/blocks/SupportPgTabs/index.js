import React, { useState } from 'react'
import SupportTab from './SupportTab'
import SupportCenterHome from './SupportCenterHome'
import OpenTicket from './OpenTicket'
import CheckTicket from './CheckTicket'

export default function SupportPgTabs() {
  const supportTab = [
    { id: 1, title: 'Support Center Home', tabIcon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M2491 4819 c-19 -12 -579 -419 -1244 -906 -780 -572 -1216 -897 -1228 -917 -65 -106 61 -240 171 -183 14 7 549 397 1190 867 641 469 1172 854 1180 854 8 0 546 -389 1194 -864 1104 -808 1182 -863 1225 -867 108 -9 179 108 119 197 -14 21 -470 361 -1203 898 -649 475 -1207 882 -1239 903 -69 45 -113 50 -165 18z"/><path d="M626 2770 c-65 -42 -61 36 -64 -1190 -2 -613 0 -1139 3 -1169 5 -41 14 -61 40 -90 l33 -36 711 -3 c786 -3 751 -5 791 61 19 31 20 55 20 709 0 463 4 694 11 730 44 208 249 347 455 309 164 -30 289 -149 323 -309 7 -36 11 -267 11 -730 0 -654 1 -678 20 -709 40 -66 5 -64 791 -61 l711 3 33 36 c26 29 35 49 40 90 3 30 5 556 3 1169 -3 1044 -4 1117 -21 1147 -48 89 -185 84 -232 -7 -13 -25 -15 -175 -15 -1105 l0 -1075 -529 0 -530 0 -4 628 c-4 700 -4 693 -75 831 -90 173 -252 303 -433 346 -85 20 -243 19 -325 -1 -179 -45 -353 -189 -433 -357 -65 -138 -64 -119 -68 -815 l-4 -632 -530 0 -529 0 0 1075 c0 1173 3 1107 -56 1154 -35 28 -108 28 -148 1z"/></g></svg>' },
    { id: 2, title: 'Open a New Ticket', tabIcon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M1055 5110 c-194 -41 -352 -179 -417 -368 l-23 -67 0 -2115 0 -2115 23 -66 c57 -166 185 -294 350 -351 l67 -23 1505 0 1505 0 67 23 c165 57 293 185 350 351 l23 66 0 1660 0 1660 -26 71 c-14 39 -43 96 -63 127 -46 69 -1028 1002 -1119 1064 -34 22 -91 52 -127 65 l-65 23 -1005 2 c-553 0 -1023 -3 -1045 -7z m1897 -758 l3 -467 33 -67 c38 -77 92 -130 171 -167 l56 -26 498 -3 497 -3 0 -1553 c0 -1744 6 -1611 -75 -1691 -80 -81 39 -75 -1575 -75 -1614 0 -1495 -6 -1575 75 -82 81 -75 -112 -75 2185 0 2298 -7 2104 75 2185 77 77 20 73 1047 74 l917 1 3 -468z m761 -116 c180 -170 327 -311 327 -313 0 -1 -171 -3 -379 -3 -332 0 -382 2 -395 16 -14 13 -16 62 -16 376 l0 360 68 -63 c37 -34 214 -202 395 -373z"/><path d="M1358 3099 c-43 -22 -78 -81 -78 -129 0 -50 35 -107 80 -130 39 -20 56 -20 1170 -20 1114 0 1131 0 1170 20 45 23 80 80 80 130 0 50 -35 107 -80 130 -39 20 -56 20 -1172 20 -1108 -1 -1134 -1 -1170 -21z"/><path d="M1358 2299 c-43 -22 -78 -81 -78 -129 0 -50 35 -107 80 -130 39 -20 56 -20 1170 -20 1114 0 1131 0 1170 20 45 23 80 80 80 130 0 50 -35 107 -80 130 -39 20 -56 20 -1172 20 -1108 -1 -1134 -1 -1170 -21z"/><path d="M1358 1500 c-43 -23 -78 -82 -78 -130 0 -50 35 -107 80 -130 39 -20 54 -21 445 -18 390 3 405 4 431 24 50 37 68 70 68 124 0 54 -18 87 -68 124 -27 20 -41 21 -434 23 -390 2 -409 2 -444 -17z"/></g></svg>' },
    { id: 3, title: 'Check Ticket Status', tabIcon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M941 4998 c-74 -28 -142 -97 -170 -172 l-21 -57 2 -2107 3 -2107 27 -50 c34 -64 90 -118 153 -147 l50 -23 1163 -3 1164 -2 41 -29 c165 -113 387 -181 592 -181 287 0 534 101 742 303 212 206 323 466 323 757 0 392 -214 746 -570 940 l-65 35 -5 1085 c-3 597 -6 1087 -8 1090 -13 26 -665 666 -689 676 -27 12 -245 14 -1355 13 -1317 0 -1323 0 -1377 -21z m2581 -400 c3 -182 5 -208 24 -249 31 -67 87 -124 152 -156 56 -27 61 -28 260 -31 l202 -3 0 -970 0 -969 -57 7 c-32 5 -116 7 -188 7 -104 -1 -149 -7 -228 -27 -380 -100 -672 -391 -774 -772 -23 -89 -26 -118 -26 -260 0 -141 3 -172 26 -258 28 -104 95 -257 146 -331 17 -24 31 -47 31 -50 0 -3 -458 -6 -1017 -6 -949 0 -1020 1 -1053 18 -19 9 -40 28 -47 42 -19 38 -18 4125 1 4159 29 53 -31 50 1303 51 l1242 0 3 -202z m478 -220 c0 -5 -38 -8 -85 -8 -156 0 -185 30 -185 192 l0 93 135 -135 c74 -74 135 -138 135 -142z m154 -2379 c254 -64 454 -230 565 -471 60 -129 75 -201 75 -358 -1 -106 -5 -152 -22 -213 -107 -390 -473 -657 -867 -634 -124 8 -206 28 -313 78 -242 112 -404 307 -473 570 -30 115 -30 280 -1 400 113 464 575 744 1036 628z"/><path d="M1543 3718 c-55 -27 -65 -124 -16 -170 l25 -23 528 0 c506 0 529 1 549 19 12 11 26 36 32 56 14 46 -8 101 -47 119 -34 15 -1039 14 -1071 -1z"/><path d="M1555 3191 c-75 -31 -81 -157 -9 -190 36 -16 1992 -16 2028 0 58 27 69 124 19 171 l-25 23 -996 2 c-548 1 -1006 -2 -1017 -6z"/><path d="M1550 2653 c-77 -39 -74 -156 5 -189 30 -12 143 -14 804 -12 764 3 770 3 798 24 55 41 55 127 0 168 -28 21 -34 21 -800 24 -720 2 -774 1 -807 -15z"/><path d="M4212 1583 c-29 -14 -49 -48 -164 -277 -72 -144 -132 -263 -134 -265 -3 -3 -60 51 -129 119 l-125 123 -41 -6 c-55 -7 -89 -41 -96 -96 l-6 -42 194 -195 c189 -190 194 -194 235 -194 27 0 51 7 69 22 34 27 355 674 355 716 0 37 -35 90 -66 102 -35 14 -54 12 -92 -7z"/></g></svg>' },
  ]

  const supportHome = [
    { id: 1, icon: '/images/open_ticket.png', text: 'Please provide as much detail as possible so we can best assist you. To update a previously submitted ticket, please login.', ctaCnt: 'Open a Ticket', idLink:2 },
    { id: 2, icon: '/images/my_ticket.png', text: 'We provide archives and history of all your current and past support requests complete with responses according to assets', ctaCnt: 'My Ticket', idLink:3 },
  ]

  const openTicket = {
    title: 'Open a New Ticket',
    desc: 'Please fill in the form below to open a new ticket.',
  };

  const myTicket = {
    title: 'Check Ticket Status',
    desc: 'Please provide your email address and a ticket number. This will sign you in to view your ticket.',
  };


  // Tab Effect state is been created with switch condition

  const [activeTab, setActiveTab] = useState(1);

  const renderTabDetail = () => {
    switch (activeTab) {
      case 1:
        return <SupportCenterHome supportHome={supportHome} handleTabClick={handleTabClick}/>;
      case 2:
        return <OpenTicket ticketInfo={openTicket} />;
      case 3:
        return <CheckTicket ticketInfo={myTicket} />;
        default:
          return null;
    }
  }

  const handleTabClick = (tabId) => {
    if(tabId === 2 || tabId === 3){
      setActiveTab(tabId);
    } else{
      setActiveTab(1);
    }
  };


  return (
    <>
      <div className="section_padding zero_top">
        <div className="main_container">
          <div className="support_main">
            <div className="support_tab_sec">
              <SupportTab supportTab={supportTab} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            <div className="support_tab_dtl">
              {renderTabDetail()}              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
