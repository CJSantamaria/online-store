function getLink( url: string, currentPage: number, totalPages: number,direction: string ): string {
  let newPage: number;

  if (currentPage > totalPages) {    // fix for when the user manually changes the page number in the url
    newPage= direction === "prev" ? totalPages : 0;
  } else {
    newPage= direction === "prev" ? currentPage - 1 : currentPage + 1;
  }

  const regex = /page=\d+/;  // regex to check if the url already has a page query
  if (regex.test(url)) {
      const link = url.replace(/page=\d+/, `page=${newPage}`);
      return link;
  }
  
  if (url.includes("?")){ // if the url already has a query, add the page query
    const link = url.concat(`&page=${newPage}`);
    return link;
  } 
  
  const link = url.concat(`?page=${newPage}`); // if the url doesn't have a query, add the page query
    return link;
}

export default getLink;
