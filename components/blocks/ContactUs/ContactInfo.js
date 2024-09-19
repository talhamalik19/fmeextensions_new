
import { imageLoader } from '@/components/shared/imageLoader'
import dlv from 'dlv'
import Image from 'next/image'
import Link from 'next/link'

export default function ContactInfo({ contactInfo, sarabun }) {
    return (
        <>
            {contactInfo &&
                contactInfo.map((Item, index) =>
                    <div className="contact_info" key={`contact-${index}`}>
                        <h2 className={`${sarabun} title`}>{dlv(Item,'title')}</h2>
                        <ul className="cnt_list">
                            {dlv(Item,'buttons') &&
                                dlv(Item,'buttons').map((item, index) =>
                                    <li key={index}>
                                        <Link href={dlv(item,'field_redirect')} target={dlv(item,'field_target')}>
                                            <Image
                                                loader={imageLoader}
                                                src={dlv(Item, `icon.${index}.url`)}
                                                alt={`${dlv(Item, `icon.${index}.alt`)}`}
                                                width={20}
                                                height={10}
                                                style={{ width: 'auto', height: 'auto' }}
                                            />
                                            {dlv(item, 'field_text')}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                        {dlv(Item,'timings') && <p className='primary_text timings'>{dlv(Item,'timings')}</p>}
                    </div>
                )
            }
        </>
    )
}
