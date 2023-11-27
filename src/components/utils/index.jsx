// Get the url of the Strapi API based om the env variable or the default local one.
export function getStrapiURL(path) {
    return `${"http://localhost:1337/api"}${path}`;
  }
  
  // This function will get the url of your medias depending on where they are hosted
  export function getStrapiMedia(url) {
    if (url == null) {
      return null;
    }
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    return `${"http://localhost:1337/api"}${url}`;
  }
  
  // handle the redirection to the homepage if the page we are browsinng doesn't exists
  export function redirectToHomepage() {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  
  // This function will build the url to fetch on the Strapi API
  export function getData(slug, apiPath, sort) {
    const slugToReturn = `/${slug}`;
    const apiUrl = `${apiPath}/?slug=${slug}&populate=deep,20&populate=image&sort=${sort}`;
  
    // console.log(getStrapiURL(apiUrl))
    return {
      data: getStrapiURL(apiUrl),
      slug: slugToReturn,
    };
  }