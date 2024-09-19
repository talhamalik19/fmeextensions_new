import ImageBlock from '@/components/global/ImageBlock'
import dlv from 'dlv';
import Link from 'next/link';

export default function ShopingSteps({ steps, cartItems, bkHome }) {
    const logo = "/images/logo.png";
    return (
        <>
            <div className="reg_header shopping_header">
                <Link href={'/'} className="shoping_cta">
                    <picture>
                        <source media="(min-width: 600px)" srcSet="/images/logo.png" />
                        <source media="(min-width:200px )" srcSet="/images/responsive_logo.png" />
                        <ImageBlock image={logo} />
                    </picture>
                </Link>

                {dlv(cartItems, 'items.length') > 0 &&
                    <ul className="steps">
                        {
                            steps && steps.map((step, index) =>
                                <li className='steps_item' key={index}>
                                    <div className={step.is_active == 'true' ? "circle_block active" : "circle_block"}>
                                        <span className='step_circle'>
                                            {
                                                step.is_checked == 'true' ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="white" className="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                    : ''
                                            }
                                        </span>
                                    </div>
                                    <span className="text">{step.text}</span>
                                </li>
                            )
                        }
                    </ul>
                }
                {
                    dlv(cartItems, 'items.length') === 0 ?
                        <>
                            <Link href={dlv(bkHome, 'button.field_redirect') || ''} className='primary_cta secondary_cta resp'>{dlv(bkHome, 'button.field_text')}</Link>
                        </> : ''
                }
            </div>
        </>
    )
}
