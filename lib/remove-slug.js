export async function removeCacheData(currency_code, store_code, identifier, update = false) {
  const pageSlug = identifier.split(',');
  try {
    const fs = require('fs');
    const path = require('path');

    const filePathPage = path.join(process.cwd(), 'json/page', `${pageSlug.join('_')}_${store_code}_${currency_code}.json`);
    const filePathCategory = path.join(process.cwd(), 'json/category', `${pageSlug.join('_')}_${store_code}_${currency_code}.json`);
    const filePathProduct = path.join(process.cwd(), 'json/product', `${pageSlug.join('_')}_${store_code}_${currency_code}.json`);
    const filePathBlogCategory = path.join(process.cwd(), 'json/page', `blog_${pageSlug.join('_')}_${store_code}.json`);
    const filePathBlog = path.join(process.cwd(), 'json/page', `blog_${store_code}.json`);

    if (fs.existsSync(filePathPage)) {
      fs.unlinkSync(filePathPage);
    }
    if (fs.existsSync(filePathProduct)) {
      fs.unlinkSync(filePathProduct);
    }
    if (fs.existsSync(filePathCategory)) {
      fs.unlinkSync(filePathCategory);
    }
    if (fs.existsSync(filePathBlogCategory)) {
      fs.unlinkSync(filePathBlogCategory);
    }
    if (fs.existsSync(filePathBlog)) {
      fs.unlinkSync(filePathBlog);
    }

  } catch (error) { console.log(error) }
}
