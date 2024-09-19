import SectionHeadLeft from '@/components/global/SectionHeadLeft'
import React from 'react'
import PartnerCard from './PartnerCard'
import PartnerTab from './PartnerTab'

export default function PartnersInfo() {
    const partnerInfo = [
        {
            id: 1, packageName:'Gold', title: 'Our Gold Partners', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis pulvinar libero. Aliquam erat volutpat.', svg:'<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="56.000000pt" height="56.000000pt" viewBox="0 0 56.000000 56.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,56.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M277 464 c-10 -11 -9 -52 2 -59 13 -8 24 32 14 50 -5 9 -12 12 -16 9z"/><path d="M145 418 c15 -48 43 -51 31 -3 -4 14 -13 25 -22 25 -11 0 -14 -6 -9 -22z"/><path d="M390 420 c-15 -28 -1 -49 17 -25 15 22 17 45 3 45 -5 0 -14 -9 -20 -20z"/><path d="M36 372 c-6 -10 21 -52 35 -52 5 0 9 6 9 13 0 18 -36 51 -44 39z"/><path d="M497 362 c-18 -20 -23 -42 -9 -42 18 0 46 40 36 50 -7 7 -16 4 -27 -8z"/><path d="M176 306 c-32 -56 -42 -65 -69 -68 -27 -3 -36 -12 -68 -68 -21 -35 -35 -68 -33 -72 7 -10 541 -10 548 0 2 4 -12 37 -33 72 -32 56 -41 65 -68 68 -27 3 -37 12 -69 68 l-38 64 -66 0 -66 0 -38 -64z m181 -11 c12 -22 23 -43 23 -47 0 -5 -45 -8 -100 -8 -55 0 -100 3 -100 8 0 4 10 26 22 50 l23 43 55 -3 c52 -3 55 -5 77 -43z m-133 -119 c14 -25 26 -47 26 -50 0 -3 -47 -6 -105 -6 l-105 0 15 25 c8 14 22 36 30 50 13 21 23 25 64 25 47 0 50 -1 75 -44z m96 35 c0 -12 -33 -71 -40 -71 -7 0 -40 59 -40 71 0 5 18 9 40 9 22 0 40 -4 40 -9z m172 -43 l27 -48 -104 0 c-58 0 -105 3 -105 6 0 3 12 26 26 50 26 45 27 45 77 42 49 -3 52 -5 79 -50z"/></g></svg>',
            card:[
                {id:1, icon:'images/gold-1.png', partnerName:'ITech5', ctaCnt:'Website'},
                {id:2, icon:'images/gold-2.png', partnerName:'Go Gulf', ctaCnt:'Website'},
                {id:3, icon:'images/gold-3.png', partnerName:'Uppii Marketing Turismo e Produção ', ctaCnt:'Website'},
                {id:4, icon:'images/gold-4.png', partnerName:'iovista inc', ctaCnt:'Website'},
                {id:5, icon:'images/gold-5.png', partnerName:'Square', ctaCnt:'Website'},
                {id:6, icon:'images/gold-6.png', partnerName:'Imajize', ctaCnt:'Website'},
                {id:7, icon:'images/gold-7.png', partnerName:'Papakaliatis Koukourakis SA', ctaCnt:'Website'},
                {id:8, icon:'images/gold-8.png', partnerName:'secondreality GmbH', ctaCnt:'Website'},
            ]
        },
        {
            id: 2, packageName:'Sliver', title: 'Our Sliver Partners', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis pulvinar libero. Aliquam erat volutpat.', svg:'<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M210 440 c-9 -17 -17 -20 -46 -14 -42 8 -64 -8 -64 -45 0 -20 -7 -29 -30 -38 -22 -8 -30 -18 -30 -37 0 -13 5 -28 10 -31 13 -8 13 -45 0 -45 -5 0 -10 -14 -10 -31 0 -25 6 -33 30 -42 23 -9 30 -18 30 -38 0 -37 22 -53 64 -45 29 6 37 3 46 -14 15 -27 65 -27 80 0 9 17 17 20 46 14 42 -8 64 8 64 45 0 20 7 29 30 38 22 8 30 18 30 37 0 13 -4 28 -10 31 -5 3 -10 15 -10 26 0 10 5 19 10 19 6 0 10 14 10 31 0 25 -6 33 -30 42 -23 9 -30 18 -30 38 0 37 -22 53 -64 45 -29 -6 -37 -3 -46 14 -7 13 -21 20 -40 20 -19 0 -33 -7 -40 -20z m62 -18 c17 -25 39 -31 61 -20 22 12 48 -7 40 -28 -7 -19 25 -54 49 -54 22 0 24 -23 3 -40 -19 -16 -19 -39 1 -61 17 -19 12 -39 -10 -39 -20 0 -49 -37 -43 -54 8 -20 -14 -35 -38 -26 -25 9 -45 2 -67 -25 l-18 -20 -18 21 c-23 27 -43 34 -65 22 -23 -12 -47 6 -40 31 6 22 -21 51 -48 51 -23 0 -25 23 -4 40 19 16 19 44 0 60 -21 17 -19 40 3 40 24 0 56 35 49 54 -8 20 14 35 38 26 25 -9 46 -2 63 22 17 23 27 23 44 0z"/><path d="M225 320 c-9 -16 -23 -30 -33 -30 -9 0 -24 -5 -32 -10 -12 -7 -11 -13 9 -34 19 -20 22 -31 17 -60 -8 -41 5 -47 42 -20 20 14 24 14 44 0 38 -27 51 -21 43 20 -5 30 -2 41 17 61 19 20 20 25 8 33 -8 5 -23 10 -32 10 -10 0 -24 14 -33 30 -9 17 -20 30 -25 30 -5 0 -16 -13 -25 -30z m35 -30 c0 -6 12 -15 26 -20 23 -9 24 -12 13 -27 -8 -9 -13 -23 -11 -32 2 -13 -6 -16 -38 -16 -34 0 -40 3 -40 20 0 12 -5 26 -12 33 -8 8 -5 14 15 21 15 6 27 15 27 21 0 5 5 10 10 10 6 0 10 -5 10 -10z"/></g></svg>',
            card:[
                {id:1, icon:'images/silver-1.png', partnerName:'Viha Digital Commerce Pvt Ltd', ctaCnt:'Website'},
                {id:2, icon:'images/silver-2.png', partnerName:'Webiators Technologies', ctaCnt:'Website'},
                {id:3, icon:'images/silver-3.png', partnerName:'Server (Guy Mantra Tech Ventures)', ctaCnt:'Website'},
                {id:4, icon:'images/silver-4.png', partnerName:'MageComp', ctaCnt:'Website'},
                {id:5, icon:'images/silver-5.png', partnerName:'Webiators Technologies', ctaCnt:'Website'},
                {id:6, icon:'images/silver-6.png', partnerName:'Zestard Technologies', ctaCnt:'Website'},
            ]
        },
        {
            id: 3, packageName:'Ready', title: 'Our Ready Partners', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis pulvinar libero. Aliquam erat volutpat.', svg:'<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M125 370 c-55 -32 -101 -63 -103 -68 -5 -15 209 -134 227 -127 47 17 212 118 209 127 -5 13 -206 128 -222 127 -6 0 -56 -27 -111 -59z m210 -17 c47 -27 85 -50 85 -53 0 -7 -166 -100 -179 -100 -13 0 -181 93 -181 100 0 8 163 99 177 100 7 0 51 -21 98 -47z"/><path d="M20 241 c0 -16 212 -132 229 -126 39 15 211 117 211 126 0 15 -10 11 -111 -46 -53 -30 -102 -55 -108 -55 -6 0 -55 25 -109 55 -103 57 -112 61 -112 46z"/><path d="M20 181 c0 -16 212 -132 229 -126 39 15 211 117 211 126 0 15 -10 11 -111 -46 -53 -30 -102 -55 -108 -55 -6 0 -55 25 -109 55 -103 57 -112 61 -112 46z"/></g></svg>',
            card:[
                {id:1, icon:'images/ready-1.png', partnerName:'Sconch', ctaCnt:'Website'},
                {id:2, icon:'images/ready-2.png', partnerName:'Dredd', ctaCnt:'Website'},
                {id:3, icon:'images/ready-3.png', partnerName:'Unleashed Web Solutions Ltd', ctaCnt:'Website'},
                {id:4, icon:'images/ready-4.png', partnerName:'E Business Atlantique', ctaCnt:'Website'},
                {id:5, icon:'images/ready-5.png', partnerName:'Dredd', ctaCnt:'Website'},
                {id:6, icon:'images/ready-6.png', partnerName:'CIMA', ctaCnt:'Website'},
                {id:7, icon:'images/ready-7.png', partnerName:'Gaaf', ctaCnt:'Website'},
                {id:8, icon:'images/ready-8.png', partnerName:'Creative ICT', ctaCnt:'Website'},
                {id:9, icon:'images/ready-9.png', partnerName:'Uppii Marketing Turismo e Produção ', ctaCnt:'Website'},
            ]
        }
    ]
    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    <div className="partner_dtl_section">
                        <PartnerTab partnerTab={partnerInfo}/>
                        {
                            partnerInfo.map((partner) =>
                            <div id={`tab_${partner.id}`} className="partner_inner" key={partner.id}>
                                <SectionHeadLeft title={partner.title} desc={partner.desc}/>
                                <div className="partner_info_grid grid_custom">
                                    <PartnerCard partnerCard={partner}/>
                                </div>
                            </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
