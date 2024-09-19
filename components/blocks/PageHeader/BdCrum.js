import Link from 'next/link'

function capitalizeFirstLetter(string) {
  try {
    const result = string
      .split(/[_-\s]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    return result;
  } catch (e) {
    return string;
  }
}

export default function BdCrum({ pageName, bdInfo, sarabun }) {
  let breadCrumbs = pageName;
  try{
    breadCrumbs = pageName.split('/');
  }catch(e){

  }
  return (
    <div className="page_info">
      {<h2 className={`${sarabun} pg_title`}>{bdInfo}</h2>}
      <ul className='bdcrum'>
        <li className='bdcrum_item'><Link href={'/'}>Home</Link></li>
        {breadCrumbs && breadCrumbs.map((bc)=>{
          if(bc){
            return (
              <li className='bdcrum_item'>{<Link style={{pointerEvents:bc == 'author' ? 'none' : ''}} href={`/${bc == 'services' ? 'magento-services' : bc}`}>{capitalizeFirstLetter(bc.replaceAll('/','').replace(/(\?|&)module=[^&]*(&|$)/, '$1').replace('?',''))}</Link>}</li>
            )
          }
        }
        )}
      </ul>
    </div>

  )
}
