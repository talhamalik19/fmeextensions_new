import { getStrapiURL } from "../../utils";

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/xml');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const sitemapRequest = await fetch(getStrapiURL("/sitemap-en-pages.xml"), requestOptions);

  if (sitemapRequest.ok) {
    try {
      // Get sitemap text
      const sitemapContent = await sitemapRequest.text();
      
      // Access environment variable directly in the API route
      const updatedSitemap = sitemapContent.replace(
        /https:\/\/datam2\.fmeextensions\.com/g,
        process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com'
    );    

      res.send(updatedSitemap);
    } catch (error) {
      console.error('Error processing sitemap:', error);
      res.status(500).end('Internal Server Error');
    }
  } else {
    console.error('Failed to fetch sitemap:', sitemapRequest.statusText);
    res.status(sitemapRequest.status).end(sitemapRequest.statusText);
  }
}
