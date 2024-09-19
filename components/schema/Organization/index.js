import Script from "next/script";
const OrganizationSchema = ({ }) => {
    return (
        <Script type="application/ld+json" id="organization-schema" strategy="lazyOnload">
            {`
            {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "FMEExtensions",
                "url": "https://www.fmeextensions.com/",
                "logo": "https://www.fmeextensions.com/images/webp/logo.webp",
                "description": "Pioneering Magento Solutions Provider. Developed over 200 powerful Magento extensions and served over 15000 satisfied customers",
                "foundingDate": "2007",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "701 Tillery Street Unit 12",
                  "addressLocality": "Austin",
                  "addressRegion": "Texas",
                  "postalCode": "78702",
                  "addressCountry": "United States"
                },
                "sameAs": [
                  "https://www.facebook.com/FMEMagentoExtensions",
                  "https://twitter.com/fmeextension",
                  "https://www.linkedin.com/company/fmeextensions/",
                  "https://www.youtube.com/channel/UC4hQxOxUxRiN1X0QPtR-0Bg/",
                  "https://commercemarketplace.adobe.com/partner/FMEExtensions"
                ],
                "telephone": "+1 919 335 6315",
                "image": "https://www.unitedsol.net/wp-content/uploads/2021/01/Usol-Logo.png"
                
              }
            `}
        </Script>
    );
};

export default OrganizationSchema;
