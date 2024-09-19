import Link from 'next/link'
import React from 'react'

export default function ArticalTab({ helpCenter, selectedItem }) {
    return (
        <>
            {helpCenter.map((item) =>
                <div className={`help_block ${selectedItem === item.id ? 'active' : ''}`} key={item.id}>
                    <h2 className="secondary_title">{item.title}</h2>
                    <ul className="help_qus">
                        {
                            item.info.map((items) =>
                                <li className="qus_list" key={items.id}>
                                    <Link href={'knowledgedetail'}>{items.question}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            )
            }
        </>
    )
}
