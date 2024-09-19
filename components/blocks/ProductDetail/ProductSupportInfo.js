
import { imageLoader } from '@/components/shared/imageLoader'
import Image from 'next/image'

export default function ProductSupportInfo({ blockContent }) {
    return (
        <div className="prod_support_row">
            {
                blockContent.cards && blockContent.cards.map((item, index) => {
                    return (
                        <div className="prod_spt_block" key={`prod_spt-${index}`}>
                            <Image
                            loader={imageLoader}
                            src={item.icon[0].url}
                            alt={item.icon[0].url}
                            width={26}
                            height={26}
                            style={{ height: 'auto' }}
                        />
                            <span className="primary_text">{item.text}</span>
                        </div>
                    )
                }
                )
            }

        </div>
    )
}
