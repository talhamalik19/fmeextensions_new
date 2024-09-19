import { imageLoader } from '@/components/shared/imageLoader';
import Image from 'next/image';
import Link from 'next/link'

export default function Logo() {
    const deskLogo = "/images/webp/logo.webp";
    const respLogo = "/images/webp/responsive_logo.webp";
    return (
        <>
            <div className="head_logo">
                <Link href="/" className='loading_action'>
                    {/* <img src="images/logo.png" alt="" /> */}
                    <picture>
                        <source media="(min-width:768px)" srcSet={deskLogo} />
                        <source media="(max-width:767px)" srcSet={respLogo} style={{height:'55px'}} />
                        <Image
                            loader={imageLoader}
                            src={deskLogo}
                            alt={`Fme Extensions`}
                            width={252}
                            height={75}
                            style={{ width: 'auto', height: 'auto' }}
                            priority={1}
                            className='loading_action'
                        />
                    </picture>
                </Link>
            </div>
        </>
    )
}
