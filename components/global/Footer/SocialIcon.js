import dlv from 'dlv'
import Image from 'next/image'
import Link from 'next/link'

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 100}`
}

export default function SocialIcon({ footerData }) {
  return (
    <ul className="social_col">
      {
        footerData && footerData.map((item, index) => {
          return (
            <li key={`social_info-${index}`}><Link href={dlv(dlv(item, 'button')[0], 'field_redirect')} target={dlv(dlv(item, 'button')[0], 'field_target')}>
              {item.icon &&
                <Image
                  loader={myLoader}
                  src={dlv(dlv(item, 'icon')[0], 'url')}
                  alt={dlv(dlv(item, 'icon')[0], 'alt')}
                  width={20}
                  height={20}
                  style={{ height: 'auto' }}
                />
              }
            </Link></li>
          )
        })
      }
    </ul>
  )
}
