// searchFileByNumber.js
const files = ["100_theme_installation_guide_the_pharmacy_online_.pdf",
"102_fme_categorybanners_installguide_1.2_1.pdf",
"104_seo-friendly-blog-installation_guide.pdf",
"105_seo-friendly-blog-user_guide.pdf",
"107_seo-meta-tags-templates-installation_guide.pdf",
"108_seo-meta-tags-templates-user_guide.pdf",
"10_theme_installation_guide_dress_shop_.pdf",
"111_seo-ultimate-pack-installation_guide.pdf",
"113_share-cart-installation_guide.pdf",
"114_share-cart-user_guide.pdf",
"116_shipping-restrictions-pro-installation_guide.pdf",
"117_shipping-restrictions-pro-user_guide.pdf",
"119_shop-by-brand-installation_guide.pdf",
"120_shop-by-brand-user_guide.pdf",
"122_size-chart-installation_guide.pdf",
"123_size-chart-user_guide.pdf",
"125_fme_enquiresmanagement_installguide_1.2.pdf",
"127_fme_eventsmanager_installguide_1.2.pdf",
"129_smart-categories-installation_guide.pdf",
"12_the_pharmacy_online_with_psd_5.zip",
"130_smart-categories-user_guide.pdf",
"132_smart-compare-installation_guide.pdf",
"133_smart-compare-user_guide.pdf",
"135_smart-wishlist-installation_guide.pdf",
"136_smart-wishlist-user_guide.pdf",
"138_social-feed-installation_guide.pdf",
"13_fme_banners-1.4.0.zip",
"140_store-faqs-installation_guide_1.pdf",
"141_store-faqs-user_guide_1.pdf",
"143_fme_mediagallery_installguide_1.2.pdf",
"145_store-locator-installation_guide.pdf",
"146_store-locator-user_guide.pdf",
"148_fme_nbanners_installguide_1.2.pdf",
"150_store-pickup-installation_guide.pdf",
"151_store-pickup-user_guide.pdf",
"153_store-switcher-installation_guide.pdf",
"154_store-switcher-user_guide.pdf",
"156_recent-sales-notification-installation_guide.pdf",
"157_recent-sales-notification-user_guide.pdf",
"159_fme_openjobs_installguide_1.2.pdf",
"15_productattachments_files_f_m_fme_prodattach_mag2ext_installguide.pdf",
"161_refer-a-friend-installation_guide.pdf",
"162_recent-sales-notification-user_guide.pdf",
"164_refund-request-installation_guide.pdf",
"166_fme_percentagepricing_installguide_1.2.pdf",
"168_restrict-product-group-installation_guide.pdf",
"169_restrict-product-group-user_guide.pdf",
"16_productattachments_files_p_r_product-attachments-user_guide.pdf",
"171_quick-view-installation_guide.pdf",
"172_quick-view-user_guide.pdf",
"176_fme_photoprogal_mag2_installguide.pdf",
"178_partial-payment-installation_guide.pdf",
"179_partial-payment-user_guide.pdf",
"17_advance_testimonial_v2_install_guide.pdf",
"181_payment-restrictions-pro-installation_guide.pdf",
"182_partial-payment-user_guide.pdf",
"184_fme_press_releases_installguide_2.0_1.pdf",
"185_fme_press_releases_userguide_2.0.pdf",
"187_percentage-pricing-installation_guide.pdf",
"188_percentage-pricing-user_guide.pdf",
"18_advanced-layout-manager-installation_guide.pdf",
"190_photo-gallery-user_guide.pdf",
"191_premium-request-a-quote-installation_guide.pdf",
"192_premium-request-a-quote-user_guide.pdf",
"194_pre-order-installation_guide.pdf",
"195_pre-order-user_guide.pdf",
"197_preselect-configurable-product-installation_guide.pdf",
"198_preselect-configurable-product-user_guide.pdf",
"19_advanced-layout-manager-user_guide.pdf",
"200_pricing_calculator_install_guide_1.0.pdf",
"201_pricing-calculator-user_guide.pdf",
"203_private-sales-installation_guide.pdf",
"204_private-sales-user_guide.pdf",
"206_product_labels_pro_install_guide_1.0.pdf",
"208_fme_productvideos_installguide_1.2.pdf",
"20_age-verification-installation_guide.pdf",
"210_product-export-installation_guide.pdf",
"211_product-export-user_guide.pdf",
"213_fme_professionalbanners_installguide_1.2.pdf",
"215_product-feed-installation_guide.pdf",
"216_product-feed-user_guide.pdf",
"218_product-grid-category-filter-installation_guide.pdf",
"219_product-grid-category-filter-user_guide.pdf",
"21_age-verification-user_guide.pdf",
"221_fme_videotestimonials_installguide_1.2.pdf",
"223_product-image-zoom-installation_guide.pdf",
"224_product-image-zoom-user_guide.pdf",
"226_force-login-installation_guide.pdf",
"227_force-login-user_guide.pdf",
"229_product-inquiry-installation_guide.pdf",
"22_ajax_add_to_cart_install_guide_1.0.pdf",
"230_product-inquiry-user_guide.pdf",
"232_form-builder-installation_guide.pdf",
"233_form-builder-user_guide.pdf",
"235_product-labels-installation_guide.pdf",
"236_product-labels-user_guide.pdf",
"238_product-reviews-import-export-installation_guide.pdf",
"239_product-reviews-import-export-user_guide.pdf",
"23_background_images_install_guide_1.0.pdf",
"241_free-shipping-bar-installation_guide.pdf",
"242_free-shipping-bar-user_guide.pdf",
"244_product-sections-installation_guide.pdf",
"245_product-sections-user_guide.pdf",
"247_product-slider-installation_guide.pdf",
"248_product-slider-user_guide.pdf",
"24_background-images-installation_guide.pdf",
"250_frequently-bought-together-installation_guide.pdf",
"251_frequently-bought-together-user_guide.pdf",
"253_frequently_bought_together_install_guide_1.0.pdf",
"254_product-tabs-installation_guide.pdf",
"255_product-tabs-user_guide.pdf",
"257_product-videos-installation_guide.pdf",
"258_product-videos-user_guide.pdf",
"25_background-images-user_guide.pdf",
"260_order-archive-installation_guide.pdf",
"261_order-archive-user_guide.pdf",
"263_gdpr-installation_guide.pdf",
"264_gdpr-user_guide.pdf",
"266_order-attributes-installation_guide.pdf",
"267_order-attributes-user_guide.pdf",
"269_gift-card-installation_guide.pdf",
"26_theme_installation_guide_beauty_product_.pdf",
"270_gift-card-user_guide.pdf",
"272_order-editor-installation_guide.pdf",
"273_order-editor-user_guide.pdf",
"275_gift-wrap-installation_guide.pdf",
"276_gift-wrap-user_guide.pdf",
"278_order-export-installation_guide.pdf",
"279_order-export-user_guide.pdf",
"281_order-import-export-installation_guide.pdf",
"282_order-import-export-user_guide.pdf",
"284_google-rich-snippets-installation_guide.pdf",
"285_google-rich-snippets-user_guide.pdf",
"287_out-of-stock-installation_guide.pdf",
"288_out-of-stock-user_guide.pdf",
"290_guest-wishlist-installation_guide.pdf",
"291_guest-wishlist-user_guide.pdf",
"293_newsletter-popup-installation_guide.pdf",
"294_newsletter-popup-user_guide.pdf",
"296_noindex-nofollow-tags-installation_guide.pdf",
"297_noindex-nofollow-tags-user_guide.pdf",
"299_magento_2_delete_account_installation_guide-v-1.0.0.pdf",
"29_bundle-product-discount-installation_guide.pdf",
"2_fme_contactus.zip",
"300_magento_2_delete_account_user_guide-v-1.0.0.pdf",
"302_magento_2_minimum_order_amount_installation_guide-v-1.0.0.pdf",
"303_magento_2_minimum_order_amount_user_guide-v-1.0.0.pdf",
"305_magento_2_smtp_installation_guide-v-1.0.0.pdf",
"306_magento_2_smtp_user_guide-v-1.0.0.pdf",
"308_magento_2_whatsapp_chat_installation_guide-v-1.0.0.pdf",
"309_magento_2_whatsapp_chat_user_guide-v-1.0.0.pdf",
"30_bundle-product-discount-user_guide_1.pdf",
"311_magento_2_whatsapp_share_installation_guide-v-1.0.0.pdf",
"312_magento_2_whatsapp_share_user_guide-v-1.0.0.pdf",
"314_maintenance-mode-page-installation_guide.pdf",
"315_maintenance-mode-pag-euser_guide.pdf",
"317_mini-cart-installation_guide.pdf",
"318_mini-cart-user_guide.pdf",
"31_buy-now-button-installation_guide.pdf",
"320_minimum-order-fee-installation_guide.pdf",
"321_minimum-order-fee-user_guide.pdf",
"323_missing-orders-installation_guide.pdf",
"324_missing-orders-user_guide.pdf",
"326_mix-_-match-installation_guide.pdf",
"327_mix-_-match-user_guide.pdf",
"329_mobile-otp-login-installation_guide.pdf",
"32_buy-now-button-user_guide.pdf",
"330_mobile-otp-login-user_guide.pdf",
"332_multi-select-layered-navigation-installation_guide.pdf",
"333_multi-select-layered-navigation-user_guide.pdf",
"335_my-account-pages-installation_guide.pdf",
"336_my-account-pages-user_guide.pdf",
"33_call-for-price-installation_guide.pdf",
"341_limit-product-quantity-per-customer-installation_guide.pdf",
"342_limit-product-quantity-per-customer-user_guide.pdf",
"344_login-as-customer-installation_guide.pdf",
"345_login-as-customer-user_guide.pdf",
"347_lookbook-installation_guide.pdf",
"348_lookbook-user_guide.pdf",
"34_call-for-price-user_guide.pdf",
"350_jobs-installation_guide.pdf",
"351_jobs-user_guide.pdf",
"353_image-alt-tags-installation_guide.pdf",
"354_image-alt-tags-user_guide.pdf",
"356_image-cleaner-installation_guide.pdf",
"357_image-cleaner-user_guide.pdf",
"359_import-export-url-rewrites-installation_guide.pdf",
"35_cancel-order-installation_guide.pdf",
"360_import-export-url-rewrites-user_guide.pdf",
"362_improved-sorting-installation_guide.pdf",
"364_invoice-email-installation_guide.pdf",
"365_invoice-email-user_guide.pdf",
"367_hide-price-for-guest-installation_guide.pdf",
"368_hide-price-for-guest-user_guide.pdf",
"36_cancel-order-user_guide.pdf",
"370_hide-price-installation_guide.pdf",
"371_hide-price-user_guide.pdf",
"373_hreflang-tags-implementer-installation_guide.pdf",
"374_hreflang-tags-implementer-user_guide.pdf",
"376_html-_-xml-seo-sitemap-generator-installation_guide.pdf",
"377_html-_-xml-seo-sitemap-generator-user_guide.pdf",
"379_limit-quantity-per-category-installation_guide.pdf",
"37_canonical-url-installation_guide.pdf",
"380_limit-quantity-per-category-user_guide.pdf",
"382_seo-ultimate-pack-user_guide.pdf",
"383_social-feed-user_guide.pdf",
"384_refund-request-user_guide.pdf",
"385_media-gallery-user_guide.pdf",
"386_improved-sorting-user_guide.pdf",
"387_customer-reviews-testimonials-user_guide.pdf",
"38_canonical-url-user_guide.pdf",
"39_category-banner-installation_guide.pdf",
"3_fme_quickrfq_1.zip",
"409_box-calculator-installation_guide.pdf",
"40_category-banner-user_guide.pdf",
"410_box-calculator-user_guide.pdf",
"415_frequently-bought-together-installation_guide.pdf",
"416_frequently-bought-together-user_guide.pdf",
"41_checkout-success-page-installation_guide.pdf",
"420_language-switcher-installation_guide_1.pdf",
"421_language-_switcher-user_guide_1.pdf",
"428_previous_next_install_guide_1.0.pdf",
"42_checkout-success-page-user_guide.pdf",
"43_configurable-product-grid-matrix-view-installation_guide.pdf",
"44_configurable-product-grid-matrix-view-user_guide.pdf",
"45_contact-us-installation_guide_2.pdf",
"46_contact-us-user_guide.pdf",
"47_convert-guest-to-customer-installation_guide.pdf",
"48_convert-guest-to-customer-user_guide.pdf",
"491_productattachments_files_p_r_privacypolicy_3.pdf",
"49_country-blocker-installation_guide.pdf",
"50_country-blocker-user_guide.pdf",
"51_cross-links-installation_guide.pdf",
"52_cross-links-user_guide.pdf",
"53_csv-pricing-installation_guide.pdf",
"54_csv-pricing-user_guide.pdf",
"55_currency-switcher-installation_guide.pdf",
"56_currency-switcher-user_guide.pdf",
"57_custom-cart-_-checkout-messages-installation_guide.pdf",
"58_custom-cart-_-checkout-messages-user_guide.pdf",
"59_customer-group-pricing-installation_guide.pdf",
"5_fme_newproducts_slider.zip",
"60_customer-group-pricing-user_guide.pdf",
"61_customer-reviews-testimonials-installation_guide_1.pdf",
"62_custom-popup-pro-installation_guide.pdf",
"63_custom-popup-pro-user_guide.pdf",
"64_distance-based-shipping-installation_guide.pdf",
"65_distance-based-shipping-user_guide_1.pdf",
"67_duplicate-categories-installation_guide.pdf",
"68_duplicate-categories-user_guide.pdf",
"6_fme_products_sold.zip",
"70_email-templates-installation_guide.pdf",
"71_email-templates-user_guide.pdf",
"73_events-manager-installation_guide.pdf",
"74_event-manager-user_guide_1.pdf",
"76_faq_product_questions_install_guide_2.0.pdf",
"78_flash-sales-with-countdown-timer-installation_guide.pdf",
"79_flash-sales-with-countdown-timer-user_guide.pdf",
"81_fme_addprod2cms_installguide_1.2_1.pdf",
"83_fme_advancearticles_installguide_1.2.pdf",
"85_fme_advancecms_installguide_1.2.pdf",
"87_fme_advancenews_installguide_1.2.pdf",
"89_webp-images-installation_guide.pdf",
"90_webp-images-user_guide.pdf",
"92_who-bought-this-also-bought-installation_guide.pdf",
"93_who-bought-this-also-bought-user_guide.pdf",
"95_fme_advancetestimonials_installguide_1.2.pdf",
"97_who-viewed-this-also-viewed-installation_guide_1.pdf",
"98_who-viewed-this-also-viewed-user_guide.pdf"];
  
  export default function searchFileByNumber(startingNumber) {
    const regex = new RegExp(`^${startingNumber}_`);
    return files.find((file) => regex.test(file));
  }
  