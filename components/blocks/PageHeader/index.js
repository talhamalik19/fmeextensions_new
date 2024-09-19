import { useEffect, useState } from "react";
import BdCrum from "./BdCrum";
import PageDescription from "./PageDescription";
import { customBlocks } from "@/pages/api/page";
import dlv from "dlv";
import { useRouter } from "next/router";
import BreadCrumPlaceholder from "@/components/shared/BreadCrumPlaceholder";

const PageHeader = ({sarabun }) => {
    const router = useRouter();
    const [blockContent, setBlockContent] = useState([]);
    const fetchBlockContent = async () => {
        const customBlocksData = await customBlocks('blocks-category-page');
        try {
            setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
        } catch (e) { }
    };
    useEffect(() => {
        fetchBlockContent();
    }, []);

    

    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    {dlv(blockContent, 'cards') ? dlv(blockContent, 'cards').map((card, index) => {
                        if (router.asPath.includes(dlv(card, 'slug'))) {
                            return (
                                <div className="pg_header" key={`header-${index}`}>
                                    <BdCrum pageName={router.asPath} bdInfo={dlv(card, 'heading')} sarabun={sarabun}/>
                                    <PageDescription text={dlv(card, 'description')} btn={dlv(card, 'button.0')} sarabun={sarabun}/>
                                </div>
                            )
                        }
                    })
                        :
                        <BreadCrumPlaceholder/>
                    }
                </div>
            </div>
        </>
    )
}

export default PageHeader;