import Link from 'next/link';
import { useEffect, useState } from 'react'
import { scroller } from 'react-scroll';

export default function CatFilter({ setFilter, filter, filteredCategories, isSearch }) {
    const [selectedFilter, setSelectedFilter] = useState(false);
    const scrollToDiv = (divId) => {
        scroller.scrollTo(divId, {
            duration: 0,
            delay: 0,
        });
    };

    const handleFilterClick = (id) => {
        setSelectedFilter(true);
        if (isSearch) {
            setFilter(id);
        }
    }

    useEffect(() => {
        if (selectedFilter) {
            scrollToDiv(filter)
        }
    }, [filter]);

    return (
        <div className="cat_filter" id={filter}>
            {filteredCategories && filteredCategories.map((filterItem) =>
                isSearch ?
                    filterItem.include_in_menu != 0 && <div className={`filter_radio ${filter === filterItem.id ? 'checked' : 'unchecked'}`} key={filterItem.id} onClick={() => handleFilterClick(filterItem.id)}>
                        <div className="radio_block">
                            <input type="radio" name={`${filterItem.name}${filterItem.sub_title}`} id={`${filterItem.name}${filterItem.sub_title}`} checked={`${filter === filterItem.id ? true : false}`} />
                            <label htmlFor={`${filterItem.name}${filterItem.sub_title}`}>{filterItem.name} {filterItem.sub_title && `(${filterItem.sub_title})`}</label>
                        </div>
                    </div>
                    :
                    filterItem.include_in_menu != 0 && <Link key={filterItem.id} href={`${filterItem.url_path}`} className='loading_action'>
                        <div className={`filter_radio ${filter === filterItem.id ? 'checked' : 'unchecked'}`} onClick={() => handleFilterClick(filterItem.id)}>
                            <div className="radio_block loading_action">
                                <input type="radio" name={filterItem.name} id={filterItem.name} checked={`${filter === filterItem.id ? true : false}`} />
                                <label className='loading_action' htmlFor={filterItem.name}>{filterItem.name}</label>
                            </div>
                            {filterItem.product_count && <span className="cat_count loading_action">{filterItem.product_count}</span>}
                        </div>
                    </Link>
            )}
        </div>
    )
}

