import Link from 'next/link'
import dlv from 'dlv'
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`
  }

export default function FooterLinks({ categories, footerData }) {
    return (

        <div className="footer_secondary_bg">
            <div className="main_container">
                <div className="footer_lnk_inner">
                    <ul className="footer_links">
                        {
                            categories && categories.map((category) =>
                                <li className='foot_item' key={category.id}><Link className='loading_action' href={`${category.url_path == '/support' ? 'support-center' : category.url_path}`}>{category.name}</Link></li>
                            )
                        }
                       {
                        dlv(footerData,'navigations') && dlv(footerData,'navigations').map((nav)=>{
                            return (dlv(nav,'button').map((button, index)=>{
                               return (
                                <li key={`nav${index}`} className='foot_item'><Link className='loading_action' href={dlv(button,'field_redirect')}>{dlv(button,'field_text')}</Link></li>
                               )
                            })
                            )
                        })
                       }
                    </ul>
                    <div className="image">
                        {dlv(footerData,'image') && 
                        <Image
                        loader={myLoader}
                        src={dlv(footerData.image[0],'url')}
                        alt={dlv(footerData.image[0], 'alt')}
                        width={418}
                        height={21}
                        style={{ width: '100%', height: 'auto' }}
                      />
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
