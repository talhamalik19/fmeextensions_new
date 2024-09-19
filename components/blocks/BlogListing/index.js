
import BlogHeader from './BlogHeader'
import BlogSlider from './BlogSlider'
import BlogListSec from './BlogListSec'

export default function BlogListing({ pageName }) {
    

    const blogStartup = {
        title: 'Insights to keep your startup’s cash flowing',
        ctaCnt: 'Explore More',
        blog_cat: true,
        blogList: [
            { id: 1, featuredBlog: true, title: 'A Step by Step Guide on How to Change Currency in Magento 2', desc: 'Magento offers a wide range of features and functionality to create, customize, and manage an e-commerce website. One of the most powerful features of Magento 2 is multi-store and multilingual support. It allows you to localize your store by offering multiple languages and currencies, making it suitable for global expansion ', date: '02-04-2023', image: 'images/blog_image-1.png', },
            { id: 2, featuredBlog: false, title: 'Why is Magento the Best eCommerce Platform for Businesses?', desc: 'Learn from top startup operators about how to narrow in on product-market fit ahead of launch, and maintain it as your company. ', date: '22-04-2023', image: 'images/blog_image-1.png', },
            { id: 3, featuredBlog: false, title: 'How to Auto Select the Cheapest Child Product of a Configurable Product?', desc: 'Magento offers a wide range of features and functionality to create, customize, and manage an e-commerce website. One of the most powerful features of Magento 2 is multi-store and multilingual support. It allows you to localize your store by offering multiple languages and currencies, making it suitable for global expansion ', date: '02-04-2023', image: 'images/blog_image-1.png', },
            { id: 4, featuredBlog: false, title: 'Magento 2: How to Add Category Filter to Admin Product Grid?', desc: 'Magento offers a wide range of features and functionality to create, customize, and manage an e-commerce website. One of the most powerful features of Magento 2 is multi-store and multilingual support. It allows you to localize your store by offering multiple languages and currencies, making it suitable for global expansion ', date: '02-04-2023', image: 'images/blog_image-1.png', },
        ]
    }
    const latestBlog = {
        title: 'Discover the latest from FME Extensions',
        ctaCnt: 'Explore More',
        blogList: [
            { id: 1, featuredBlog: true, title: 'How to Add Video To Product In Magento 2', desc: 'Magento offers a wide range of features and functionality to create, customize, and manage an e-commerce website. One of the most powerful features of Magento 2 is multi-store and multilingual support. It allows you to localize your store by offering multiple languages and currencies, making it suitable for global expansion ', date: '02-04-2023', image: 'images/blog_image-2.png', blogListCta: true, },
            { id: 2, featuredBlog: false, title: 'Top 3 Prestashop Addons for your Store', desc: 'Prestashop is one of the most commonly used Ecommerce platforms worldwide. Due to its reliability.  ', date: '22-04-2023', image: 'images/blog_image-1.png', blogListCta: true, },
            { id: 3, featuredBlog: false, title: 'Why is Magento Best Ecommrece Platform for Business', desc: 'Setting up an Ecommerce platform may seem easy considering the advancements in eCommerce ..', date: '02-04-2023', image: 'images/blog_image-1.png', blogListCta: true, },
        ]
    }

    return (
        <>
            <div className="blog_list_wrapper">
                <BlogHeader pageName={pageName} />
                <BlogSlider />
                <BlogListSec blogListing={blogStartup}/>
                <BlogListSec blogListing={latestBlog} blogClass="reverse_col" secClass="latest_blog" />
            </div>
        </>
    )
}
