import ImageBlock from '@/components/global/ImageBlock'
import React from 'react'

export default function IconWidget({ iconBox }) {
    return (

        <>
            <div className="icon_widget_container grid_custom">
                {
                    iconBox.map((item) =>
                        <div className="icon_widget" key={item.id}>
                            <div className="icon center-img">
                                <ImageBlock image={item.image} />
                            </div>
                            <div className="icon_cnt">
                                <h3 className="secondary_title">{item.title}</h3>
                                <p className="primary_text">{item.text}</p>
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}
