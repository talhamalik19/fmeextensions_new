import dlv from 'dlv'
import Link from 'next/link'

export default function CartCTA({ blockContent }) {
    return (
        <>
            <div className="cart_ctas shoping_title_row">
                <div className="block">
                    <Link href={dlv(blockContent, 'cards.0.button1.0.field_redirect') || ''} className='primary_cta cta gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                            <path d="M11 11.4883L1 1.48828L11 11.4883ZM1 1.48828L10.6 1.48828L1 1.48828ZM1 1.48828L1 11.0883L1 1.48828Z" fill="#141414" />
                            <path d="M11 11.4883L1 1.48828M1 1.48828L10.6 1.48828M1 1.48828L1 11.0883" stroke="#141414" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {dlv(blockContent, 'cards.0.button1.0.field_text')}
                    </Link>
                </div>
            </div>
        </>
    )
}
