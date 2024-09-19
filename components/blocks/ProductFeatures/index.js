import React, { useState, useEffect, useRef } from "react";
import FeatureTabs from "./FeatureTabs";
import ProductReview from "./ProductReview";
import RelatedProduct from "./RelatedProduct";
import ProductFaq from "./ProductFaq";
import MagentoGalleryFeature from "../MagentoGalleryFeature";
import dlv from "dlv";
import { customBlocks } from "@/pages/api/page";
import InnerHtml from "@/components/shared/InnerHtml";
import CustomerReview from "../CustomerReview";

// import ProductFaq from './ProductFaq';

const ProductFeatures = ({ product, productBasicInfo, sarabun }) => {
  const [blockContent, setBlockContent] = useState([]);
  const fetchBlockContent = async () => {
    const customBlocksData = await customBlocks("product-detail-page");
    try {
      setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
    } catch (e) {
    }
  };
  useEffect(() => {
    fetchBlockContent();
  }, [product]);
  let sections = [];
  try {
    sections = JSON.parse(product.description.html) || "";
  } catch (e) {}

  const featTabs = [
    {
      id: 1,
      tab: "Features",
      tabIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M2380 4954 c-160 -18 -230 -29 -330 -51 -900 -197 -1601 -880 -1820 -1775 -52 -211 -64 -322 -64 -568 0 -304 35 -520 129 -789 297 -850 1019 -1445 1927 -1587 157 -25 518 -25 675 -1 527 83 993 317 1358 682 373 373 613 860 687 1395 19 141 16 497 -6 638 -73 470 -258 877 -559 1228 -374 437 -883 716 -1474 809 -93 15 -448 28 -523 19z m510 -179 c885 -135 1610 -785 1834 -1645 56 -214 71 -335 70 -575 0 -235 -13 -340 -69 -561 -95 -370 -284 -707 -554 -987 -272 -282 -605 -485 -970 -592 -242 -71 -379 -90 -646 -89 -249 1 -374 17 -598 78 -746 206 -1347 807 -1553 1553 -62 226 -78 349 -78 598 -1 262 18 400 86 635 216 750 839 1352 1596 1539 105 27 259 54 367 65 83 9 414 -4 515 -19z"/><path d="M2395 4633 c-40 -6 -75 -40 -75 -74 0 -74 31 -88 173 -80 98 5 111 8 128 30 26 32 24 77 -6 106 -22 23 -31 25 -107 24 -46 -1 -96 -4 -113 -6z"/><path d="M1910 4535 c-707 -235 -1239 -830 -1385 -1550 -27 -132 -45 -292 -45 -392 0 -55 4 -67 25 -88 31 -32 78 -33 109 -2 20 20 23 35 29 147 25 486 220 926 561 1266 238 237 496 389 829 489 49 15 96 36 107 48 45 47 5 127 -62 127 -18 -1 -94 -21 -168 -45z"/> <path d="M2495 4001 c-59 -26 -73 -57 -209 -473 l-132 -403 -441 -5 c-426 -5 -443 -6 -469 -26 -53 -39 -69 -71 -69 -134 0 -44 5 -66 21 -87 11 -15 172 -138 357 -273 185 -135 338 -248 342 -251 3 -4 -53 -188 -126 -410 -142 -439 -145 -454 -99 -519 24 -34 89 -69 128 -70 44 0 92 30 420 269 183 132 337 241 343 241 6 0 160 -109 342 -242 329 -239 375 -268 419 -268 39 1 104 36 128 70 46 65 43 80 -100 519 -72 221 -128 406 -125 410 4 3 158 116 343 251 184 135 345 258 356 273 16 21 21 44 21 87 0 63 -16 95 -69 134 -26 20 -43 21 -469 26 l-441 5 -132 404 c-121 368 -136 407 -168 439 -31 31 -42 36 -93 39 -32 1 -67 -1 -78 -6z m195 -548 c69 -213 134 -400 145 -416 11 -17 33 -40 48 -51 28 -20 42 -21 465 -26 l437 -5 -341 -247 c-188 -137 -350 -260 -359 -275 -40 -61 -36 -84 100 -504 70 -217 130 -397 132 -401 2 -5 2 -8 -1 -8 -2 0 -156 110 -342 245 -201 146 -353 250 -377 257 -32 10 -47 9 -81 -3 -22 -8 -191 -124 -374 -258 -184 -133 -335 -241 -336 -239 -2 2 55 181 126 398 138 422 144 451 104 513 -10 15 -172 138 -359 275 l-340 247 436 5 c422 5 436 6 464 26 15 11 37 34 48 50 11 17 76 204 145 417 68 213 127 387 130 387 3 0 62 -174 130 -387z"/></g></svg>',
    },
    {
      id: 2,
      tab: "Product Reviews",
      tabIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M2315 4789 c-763 -83 -1413 -543 -1755 -1244 -376 -768 -300 -1648 198 -2305 31 -41 63 -82 69 -91 12 -16 7 -17 -65 -12 -70 5 -79 3 -96 -16 -26 -29 -26 -85 0 -111 15 -16 57 -25 198 -46 98 -14 189 -23 202 -20 13 4 30 16 38 29 19 29 47 332 34 366 -12 33 -37 50 -74 51 -47 0 -73 -34 -80 -108 l-7 -62 -49 63 c-139 177 -286 447 -353 649 -129 393 -129 840 -1 1230 295 901 1164 1527 2061 1485 351 -17 697 -125 1010 -317 80 -49 124 -53 154 -14 43 55 20 99 -86 161 -249 148 -515 246 -798 294 -140 24 -458 33 -600 18z"/><path d="M4025 4187 c-24 -20 -29 -35 -46 -162 -25 -185 -24 -230 1 -255 26 -26 83 -27 109 -1 18 18 25 42 33 109 2 12 8 24 13 24 16 3 169 -208 234 -322 114 -202 192 -420 237 -665 26 -138 26 -505 1 -650 -81 -465 -282 -859 -602 -1180 -368 -369 -833 -571 -1365 -592 -408 -16 -831 94 -1166 303 -82 50 -129 57 -159 24 -25 -28 -25 -85 1 -109 30 -30 229 -140 345 -193 695 -310 1456 -249 2084 167 154 103 251 184 391 326 347 356 567 791 640 1270 24 154 24 453 1 603 -36 229 -102 437 -205 645 -67 137 -189 329 -275 435 -26 32 -46 60 -45 61 2 2 34 -2 71 -7 78 -10 110 2 128 49 12 32 -4 79 -31 93 -15 8 -315 50 -356 50 -7 0 -25 -10 -39 -23z"/><path d="M1883 3756 l-648 -324 -177 -179 c-187 -189 -196 -203 -162 -251 22 -32 1303 -672 1345 -672 27 0 48 16 135 102 l104 102 0 -637 c0 -350 -2 -637 -5 -637 -3 0 -255 125 -560 277 l-555 278 0 367 0 367 -23 27 c-33 37 -81 37 -114 0 l-23 -27 0 -403 c0 -370 1 -405 18 -424 21 -25 1314 -672 1342 -672 26 0 1297 635 1328 663 l22 20 0 409 c0 243 -4 417 -10 427 -16 31 -64 45 -96 29 -52 -25 -54 -34 -54 -423 l0 -360 -555 -278 -555 -277 0 632 0 632 99 -97 c82 -81 103 -97 130 -97 39 0 1345 651 1355 675 20 52 10 66 -176 252 l-183 181 -642 321 c-354 177 -654 321 -668 321 -13 0 -316 -146 -672 -324z m1227 -120 l545 -273 -543 -272 c-298 -149 -547 -271 -553 -271 -6 0 -256 123 -555 272 l-545 273 543 272 c299 149 548 272 553 272 6 0 255 -123 555 -273z m-1242 -654 l552 -277 -100 -100 -100 -100 -560 280 c-308 154 -560 282 -560 285 0 13 187 190 200 189 8 0 264 -125 568 -277z m2049 186 c51 -51 93 -96 93 -100 0 -5 -251 -134 -558 -287 l-559 -279 -98 98 c-55 55 -97 101 -94 104 9 8 1104 555 1114 555 5 1 51 -41 102 -91z"/> </g> </svg>',
    },
    {
      id: 3,
      tab: "FAQS",
      tabIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M2370 5113 c-379 -36 -661 -116 -980 -278 -378 -193 -717 -497 -965 -865 -104 -156 -232 -419 -294 -605 -49 -150 -89 -321 -113 -490 -17 -118 -17 -512 0 -630 42 -295 120 -553 242 -800 137 -280 272 -468 494 -691 221 -220 412 -357 681 -489 188 -92 309 -137 500 -185 500 -126 1002 -102 1490 71 149 53 407 182 540 271 365 243 667 578 866 963 181 348 271 694 286 1090 15 426 -73 832 -263 1214 -124 250 -263 447 -458 648 -216 224 -428 378 -711 518 -296 146 -572 225 -900 255 -102 9 -333 11 -415 3z m477 -268 c919 -121 1672 -766 1927 -1652 66 -228 81 -346 81 -633 0 -287 -15 -405 -81 -633 -209 -727 -769 -1312 -1487 -1552 -263 -87 -492 -120 -791 -112 -359 9 -630 75 -953 233 -580 283 -1018 808 -1198 1434 -65 224 -80 344 -80 630 0 223 3 271 24 385 180 1007 966 1762 1976 1899 140 19 437 19 582 1z"/><path d="M2415 3975 c-340 -64 -576 -348 -601 -725 -6 -78 -4 -88 18 -120 43 -63 117 -79 179 -37 40 26 58 71 58 142 2 126 63 269 154 359 98 99 192 136 342 136 196 0 352 -88 429 -241 45 -90 59 -161 54 -278 -7 -171 -66 -259 -281 -422 -235 -178 -307 -254 -372 -390 -58 -125 -69 -182 -69 -384 -1 -161 1 -183 18 -208 39 -57 114 -73 174 -37 52 32 62 69 62 233 0 277 44 356 310 557 274 208 368 334 406 540 35 194 -5 403 -108 567 -49 78 -159 181 -240 226 -156 86 -352 116 -533 82z"/><path d="M2364 1477 c-108 -98 7 -265 140 -202 76 36 92 141 32 201 -30 30 -40 34 -85 34 -44 0 -56 -5 -87 -33z"/></g></svg>',
    },
    {
      id: 4,
      tab: "Related Products",
      tabIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M2395 5024 c-378 -38 -647 -112 -943 -260 -146 -73 -168 -81 -182 -69 -27 25 -100 45 -159 45 -143 -1 -251 -112 -251 -260 0 -152 108 -259 261 -260 111 0 196 56 242 159 15 34 18 60 15 116 l-3 73 95 50 c332 175 693 263 1080 264 350 1 657 -63 970 -202 161 -71 360 -189 338 -200 -7 -4 -61 -15 -120 -25 -123 -21 -151 -38 -146 -87 2 -19 13 -38 29 -51 27 -19 27 -19 240 18 117 20 221 41 231 46 10 5 21 21 24 36 10 39 -61 441 -82 464 -23 25 -76 25 -99 -1 -21 -24 -22 -46 -1 -165 9 -50 16 -95 16 -102 0 -6 -44 16 -97 49 -271 171 -616 295 -955 343 -102 15 -425 27 -503 19z m-1215 -439 c38 -19 60 -63 60 -116 0 -33 -6 -47 -34 -75 -30 -30 -40 -34 -86 -34 -46 0 -56 4 -86 34 -28 28 -34 42 -34 75 0 103 91 162 180 116z"/><path d="M4362 4234 c-93 -46 -141 -127 -142 -235 0 -111 56 -196 159 -242 34 -15 60 -18 116 -15 l73 3 40 -75 c128 -237 221 -529 257 -805 18 -140 21 -440 5 -571 -28 -227 -89 -456 -177 -664 -73 -171 -201 -392 -213 -368 -4 7 -15 61 -25 120 -14 84 -22 112 -40 128 -30 28 -72 23 -98 -11 -19 -27 -19 -27 18 -240 20 -117 41 -221 46 -231 5 -10 21 -21 36 -24 39 -10 441 61 464 82 25 23 25 76 -1 99 -24 21 -46 22 -165 1 -50 -9 -95 -16 -102 -16 -6 0 16 44 49 97 176 279 299 630 350 998 16 118 16 474 -1 595 -39 290 -121 557 -247 809 -73 145 -81 167 -69 181 42 46 58 179 30 246 -60 143 -226 206 -363 138z m178 -129 c35 -18 60 -62 60 -105 0 -71 -53 -120 -131 -120 -33 0 -47 6 -75 34 -30 30 -34 40 -34 86 0 46 4 56 34 86 28 28 42 34 75 34 23 0 55 -7 71 -15z"/><path d="M446 4084 c-124 -22 -195 -39 -207 -50 -25 -23 -25 -76 1 -99 24 -21 46 -22 165 -1 50 9 95 16 102 16 6 0 -16 -44 -49 -97 -176 -280 -298 -627 -350 -998 -16 -117 -16 -473 1 -595 39 -290 121 -556 247 -809 73 -145 81 -167 69 -181 -45 -49 -58 -185 -26 -256 24 -52 83 -111 135 -135 86 -39 206 -20 283 45 82 69 108 211 57 314 -49 99 -134 146 -249 140 l-73 -3 -50 95 c-126 238 -215 524 -253 815 -17 135 -15 438 5 580 46 329 163 658 327 924 35 57 54 79 59 70 4 -8 15 -62 25 -121 14 -84 22 -112 40 -128 30 -28 72 -23 98 11 19 27 19 27 -18 240 -20 117 -40 221 -45 230 -21 38 -48 37 -294 -7z m280 -2878 c30 -30 34 -40 34 -86 0 -46 -4 -56 -34 -86 -28 -28 -42 -34 -75 -34 -78 0 -131 49 -131 120 0 72 51 119 129 120 36 0 49 -6 77 -34z"/><path d="M1905 3705 c-346 -201 -638 -374 -647 -386 -17 -20 -18 -71 -18 -760 l0 -738 23 -24 c30 -33 1270 -747 1297 -747 27 0 1267 714 1298 747 l22 24 0 739 0 739 -22 24 c-33 35 -1272 747 -1300 746 -13 0 -306 -164 -653 -364z m1205 -102 c303 -175 550 -320 550 -323 0 -5 -278 -167 -296 -172 -14 -4 -1105 624 -1101 635 2 6 284 175 295 177 1 0 250 -143 552 -317z m-445 -263 c300 -173 545 -317 545 -320 0 -3 -45 -31 -100 -62 l-100 -56 -197 114 c-109 62 -356 205 -550 316 -194 112 -352 205 -353 208 0 7 194 119 202 117 4 -1 253 -144 553 -317z m-354 -197 c302 -174 549 -320 549 -323 0 -4 -67 -45 -150 -93 l-150 -86 -550 317 c-302 174 -550 319 -550 322 0 4 286 176 299 179 2 1 250 -142 552 -316z m-376 -303 c297 -171 543 -315 548 -319 4 -4 6 -293 5 -643 l-3 -635 -395 228 c-217 126 -466 270 -552 320 l-158 91 0 640 c0 351 3 637 8 635 4 -3 250 -145 547 -317z m1798 -961 c-5 -4 -240 -141 -523 -304 -283 -163 -530 -306 -548 -317 l-32 -20 2 642 3 642 153 88 152 89 0 -250 0 -250 25 -24 c13 -14 34 -25 45 -25 20 0 347 183 393 220 22 18 22 22 27 316 l5 298 150 87 150 87 3 -636 c1 -350 -1 -639 -5 -643z m-443 802 l0 -219 -105 -61 -105 -60 2 221 3 220 100 59 c55 32 101 58 103 59 1 0 2 -99 2 -219z"/><path d="M3882 874 c-99 -49 -146 -134 -140 -249 l3 -73 -95 -50 c-238 -126 -524 -215 -815 -253 -137 -17 -439 -15 -580 5 -341 48 -642 156 -933 334 -49 30 -69 48 -60 52 7 4 61 15 120 25 84 14 112 23 128 41 28 29 23 71 -11 97 -27 19 -27 19 -240 -18 -117 -20 -221 -41 -231 -46 -10 -5 -21 -21 -24 -36 -10 -39 61 -441 82 -464 23 -25 76 -25 99 1 21 24 22 46 1 165 -9 50 -16 95 -16 102 0 6 44 -16 97 -49 282 -177 641 -302 1003 -350 124 -16 470 -16 590 1 290 39 556 121 809 247 145 73 167 81 181 69 45 -41 169 -57 242 -31 143 51 211 226 142 364 -46 93 -127 141 -235 142 -50 0 -77 -6 -117 -26z m204 -148 c28 -28 34 -42 34 -75 0 -78 -49 -131 -120 -131 -71 0 -120 53 -120 131 0 33 6 47 34 75 30 30 40 34 86 34 46 0 56 -4 86 -34z"/></g></svg>',
    },
  ];

  // State to keep track of the currently selected tab ID
  const [selectedTab, setSelectedTab] = useState(1);
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = Array.from({ length: 4 }).map(
      (_, index) => sectionRefs.current[index] || React.createRef()
    );
  }, []);

  // Function to handle tab click and scroll to the relevant section
  const handleTabClick = (tabId) => {
    try{
      setSelectedTab(tabId);
    const sectionElement = document.getElementById(`section-${tabId}`);
    const elementPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 40;
    if (sectionElement) {
      window.scrollTo({top: offsetPosition,
        behavior: 'smooth'});
      
    }
    }catch(e){}
  };

  if (typeof window !== 'undefined') {
    window.tabClick = handleTabClick;
  }
  // Add class to when scroll reach to main div

  const productFeaturesRef = useRef(null);
  useEffect(() => {
    // Function to add and remove the class when scrolling
    const handleScroll = () => {
      if (productFeaturesRef.current) {
        const scrollPosition = window.scrollY;
        const elementOffset = productFeaturesRef.current.offsetTop;
        const elementHeight = productFeaturesRef.current.offsetHeight;

        if (
          scrollPosition >= elementOffset &&
          scrollPosition < elementOffset + elementHeight
        ) {
          productFeaturesRef.current.classList.add("scroll-active"); // Add the class
          sectionRefs.current.forEach((ref, index) => {
            if (ref.current) {
              const { offsetTop, offsetHeight } = ref.current;
    
              if (scrollPosition >= offsetTop -60 && scrollPosition < offsetTop + offsetHeight) {
                setSelectedTab(index + 1);
              }
            }
        })
      } else {
          productFeaturesRef.current.classList.remove("scroll-active"); // Remove the class
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  return (
    <>
      <div ref={productFeaturesRef} className="product_dtl_feat">
        <FeatureTabs
          tab={featTabs}
          selectedTab={selectedTab}
          onTabClick={handleTabClick} sarabun={sarabun}
        />
        <div id="section-1" ref={sectionRefs.current[0]}>
          {product && <MagentoGalleryFeature product={product} sarabun={sarabun}/>}
          <div className="product_details">
            <InnerHtml content={dlv(product, "description.html")} />
          </div>
        </div>
        <div id="section-2" ref={sectionRefs.current[1]}>
          {product && (
            <CustomerReview blockContent={blockContent} product={product} sarabun={sarabun}/>
          )}
        </div>
        <div id="section-3" ref={sectionRefs.current[2]}>
          {product && (
            <ProductFaq product={product} blockContent={blockContent} sarabun={sarabun}/>
          )}
        </div>
        {dlv(product, "related_products") &&
          dlv(product, "related_products.length") > 0 && (
            <div id="section-4" ref={sectionRefs.current[3]}>
              {dlv(product, "related_products") && (
                <RelatedProduct
                  relatedProd={dlv(product, "related_products")}
                  heading={dlv(product, "related_products_heading")}
                  productBasicInfo={productBasicInfo}
                  blockContent={blockContent}
                  sarabun={sarabun}
                />
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default ProductFeatures;
