import Image from 'next/image';
import { imageLoader } from '@/components/shared/imageLoader';
import dlv from 'dlv';

export default function TwoColImage({ colImage }) {
    return (
        <div className="block image_block">
            {/* <ImageBlock image={colImage.image} /> */}
            <Image
                loader={imageLoader}
                src={dlv(colImage.image[0], 'url')}
                alt={`${dlv(colImage.image[0], 'alt')}`}
                width={400}
                height={200}
                style={{width:'100%', height: 'auto'}}
            />
        </div>
    )
}
