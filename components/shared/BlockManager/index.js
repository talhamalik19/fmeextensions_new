import dynamic from 'next/dynamic';

const HomeBanner = dynamic(() => import('../../blocks/HomeBanner'), {
  ssr: true,
});
const HomeProdListing = dynamic(() => import('../../blocks/HomeProdListing'), {
  ssr: true,
})
const CustomPdInfo = dynamic(() => import('../../blocks/CustomPdInfo'), {
  ssr: true,
})
const TrustedBrands = dynamic(() => import('../../blocks/TrustedBrands'), {
  ssr: true,
})
const IconBox = dynamic(() => import('../../blocks/IconBox'), {
  ssr: true,
})
const FeaturedBanners = dynamic(() => import('../../blocks/FeaturedBanners'), {
  ssr: true,
})
const Customer = dynamic(() => import('../../blocks/Customer'), {
  ssr: true,
})
const PageHeader = dynamic(() => import('../../blocks/PageHeader'), {
  ssr: true,
})
const HighlightedProduct = dynamic(() => import('../../blocks/HighlightedProduct'), {
  ssr: true,
})
const ProductFilter = dynamic(() => import('../../blocks/ProductFilter'), {
  ssr: true,
})
const ProductDetail = dynamic(() => import('../../blocks/ProductDetail'), {
  ssr: true,
})
const prodComboDeal = dynamic(() => import('../../blocks/ProdComboDeal'), {
  ssr: true,
})
const ProductFeatures = dynamic(() => import('../../blocks/ProductFeatures'), {
  ssr: true,
})
const SignUp = dynamic(() => import('../../blocks/Signup'), {
  ssr: true,
})
const Login = dynamic(() => import('../../blocks/Login'), {
  ssr: true,
})
const ForgotPassword = dynamic(() => import('../../blocks/ForgotPassword'), {
  ssr: true,
})
const ResetPassword = dynamic(() => import('../../blocks/ResetPassword'), {
  ssr: true,
})
const SupportFaq = dynamic(() => import('../../blocks/SupportFaq'), {
  ssr: true,
})
const SupportInfo = dynamic(() => import('../../blocks/SupportInfo'), {
  ssr: true,
})
const ContactUs = dynamic(() => import('../../blocks/ContactUs'), {
  ssr: true,
})
const RequestQuote = dynamic(() => import('../../blocks/RequestQuote'), {
  ssr: true,
})
const SupportPgTabs = dynamic(() => import('../../blocks/SupportPgTabs'), {
  ssr: true,
})
const MagentoMigration = dynamic(() => import('../../blocks/MagentoMigration'), {
  ssr: true,
})
const MagentoServicesListing = dynamic(() => import('../../blocks/MagentoServicesListing'), {
  ssr: true,
})
const Thankyou = dynamic(() => import('../../blocks/Thankyou'), {
  ssr: true,
})
const Aboutus = dynamic(() => import('../../blocks/AboutUS'), {
  ssr: true
})
const HeroInfo = dynamic(() => import('../../blocks/HeroInfo'), {
  ssr: true,
})
const ServiceDetail = dynamic(() => import('../../blocks/ServicesDetail'), {
  ssr: true,
})
const Services = dynamic(() => import('../../blocks/Services'), {
  ssr: true,
})
const CMS = dynamic(() => import('../../blocks/CMS'), {
  ssr: true,
})
const FAQ = dynamic(() => import('../../blocks/FAQ'), {
  ssr: true,
})
const OurPartners = dynamic(() => import('../../blocks/OurPartners'), {
  ssr: true,
})
const PartnerRegistration = dynamic(() => import('../../blocks/PartnerRegistration'), {
  ssr: true,
})
const PartnersInfo = dynamic(() => import('../../blocks/PartnersInfo'), {
  ssr: true,
})
const TwoCol = dynamic(() => import('../../blocks/TwoCol'), {
  ssr: true,
})
const KnowledgeCenter = dynamic(() => import('../../blocks/KnowledgeCenter'), {
  ssr: true,
})
const CheckOut = dynamic(() => import('../../blocks/Checkout'), {
  ssr: true,
})
const BlogListing = dynamic(() => import('../../blocks/BlogListing'), {
  ssr: true,
})
const BlogDetail = dynamic(() => import('../../blocks/BlogDetail'), {
  ssr: true,
})
const RelatedBlog = dynamic(() => import('../../blocks/RelatedBlog'), {
  suspense: true
})
const SearchResult = dynamic(() => import('../../blocks/SearchResult'), {
  ssr: true,
})
const MagentoGalleryFeature = dynamic(() => import('../../blocks/MagentoGalleryFeature'), {
  ssr: true,
})
const Cart = dynamic(() => import('../../blocks/Cart'), {
  ssr: true,
})
const ProductListing = dynamic(() => import('@/components/blocks/ProductListing'), {
  ssr: true,
})
const HomeIconBlock = dynamic(() => import('../../blocks/HomeIconBlock'), {
  ssr: true,
})

const getBlockComponent = ({ __component, ...rest }, index, sarabun) => {
  let Block;
  switch (__component) {
    case 'blocks-home-banner':
      Block = HomeBanner;
      break;
    case 'blocks-custom-pd-info':
      Block = CustomPdInfo;
      break;
    case 'blocks-home-prod-listing':
      Block = HomeProdListing;
      break;
    case 'blocks-prod-listing':
      Block = ProductListing;
      break;
    case 'blocks-icon-box':
      Block = IconBox;
      break;
    case 'blocks-featured-banners':
      Block = FeaturedBanners;
      break;
    case 'blocks-trusted-brands':
      Block = TrustedBrands;
      break;
    case 'blocks-customer':
      Block = Customer;
      break;
    case 'blocks-page-header':
      Block = PageHeader;
      break;
    case 'blocks-highlighted-products':
      Block = HighlightedProduct;
      break;
    case 'blocks-product-filter':
      Block = ProductFilter;
      break;
    case 'blocks-product-detail':
      Block = ProductDetail;
      break;
    case 'blocks-prod-combo-deal':
      Block = prodComboDeal;
      break;
    case 'blocks-product-features':
      Block = ProductFeatures;
      break;
    case 'blocks-signup':
      Block = SignUp;
      break;
    case 'blocks-login':
      Block = Login;
      break;
    case 'blocks-forgot-password':
      Block = ForgotPassword;
      break;
    case 'blocks-reset-password':
      Block = ResetPassword;
      break;
    case 'blocks-support-faq':
      Block = SupportFaq;
      break;
    case 'blocks-support-info':
      Block = SupportInfo;
      break;
    case 'blocks-contact-us':
      Block = ContactUs;
      break;
    case 'blocks-request-quote':
      Block = RequestQuote;
      break;
    case 'blocks-support-pg-tabs':
      Block = SupportPgTabs;
      break;
    case 'blocks-magento-migration':
      Block = MagentoMigration;
      break;
    case 'blocks-magento-services-listing':
      Block = MagentoServicesListing;
      break;
    case 'blocks-thankyou-page':
      Block = Thankyou;
      break;
    case 'blocks-AboutUs':
      Block = Aboutus;
      break;
    case 'blocks-hero-info':
      Block = HeroInfo;
      break;
    case 'blocks-services-detail':
      Block = ServiceDetail;
      break;
    case 'blocks-services':
      Block = Services;
      break;
    case 'blocks-cms':
      Block = CMS;
      break;
    case 'blocks-termCondition-cms':
      Block = CMS;
      break;
    case 'blocks-customer-service':
      Block = CMS;
      break;
    case 'blocks-faq':
      Block = FAQ;
      break;
    case 'blocks-our-partners':
      Block = OurPartners;
      break;
    case 'blocks-partner-registration':
      Block = PartnerRegistration;
      break;
    case 'blocks-partner-info':
      Block = PartnersInfo;
      break;
    case 'blocks-two-col':
      Block = TwoCol;
      break;
    case 'blocks-knowledge-center':
      Block = KnowledgeCenter;
      break;
    case 'blocks-search-result':
      Block = SearchResult;
      break;
    case 'blocks-checkout':
      Block = CheckOut;
      break;
    case 'blocks-blog-listing':
      Block = BlogListing;
      break;
    case 'blocks-blog-detail':
      Block = BlogDetail;
      break;
    case 'blocks-related-blog':
      Block = RelatedBlog;
      break;
    case 'blocks-gallery-feature':
      Block = MagentoGalleryFeature;
      break;
    case 'blocks-cart':
      Block = Cart;
      break;
    case 'blocks-home-icon-block':
      Block = HomeIconBlock;
      break;
  }
  return Block ? <Block key={`index-${index}`} {...rest} sarabun={sarabun} /> : null;
};

const BlockManager = ({ blocks, MobileDevice, sarabun }) => {
  if (MobileDevice) {
    try {
      if (blocks.length == 1) {
        return (
          <>
            {getBlockComponent(blocks[0])}
          </>
        );
      } else {
        return (
          <>
            {getBlockComponent(blocks[0])}
            {getBlockComponent(blocks[1])}
          </>
        );
      }

    } catch (e) { }
  } else {
    return <>{blocks.map((block, index) => getBlockComponent(block, index, sarabun))}</>;
  }
};

BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;
