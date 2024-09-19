
import { imageLoader } from "@/components/shared/imageLoader";
import dlv from "dlv";
import Image from "next/image";
export default function TeamImages({ items }) {
  return (
    <>
      {items.map((images) => (
        <div className="section_team_inner" key={images.id}>
          {/* <ImageBlock image={images.image} /> */}
          <Image
            loader={imageLoader}
            src={dlv(images, 'url')}
            alt={`${dlv(images, 'alt')}`}
            width={430}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ))}
    </>
  );
}
