import Link from 'next/link'
import React from 'react'

export default function ServiceBdCrum({pageName, parentNav}) {
  return (

    // ***************  Not Using this Component  **************************

    <div className="service_info">
      <ul className='bdcrum'>
        <li className='bdcrum_item'><Link href={'/'}>Home</Link></li>
        {parentNav && <li className='bdcrum_item'><Link href={'services'}>{parentNav}</Link></li>}
        <li className='bdcrum_item'>{pageName}</li>
      </ul>
    </div>
  )
}
