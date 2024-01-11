function getLink(
  url: string,
  currentPage: number,
  totalPages: number,
  direction: string
): string {
  let newPage: number;
  if (currentPage > totalPages) {
    newPage= direction === "prev" ? totalPages : 0;
  } else {
    newPage= direction === "prev" ? currentPage - 1 : currentPage + 1;
  }
  const link = url.replace(/page=\d+/, `page=${newPage}`);
  return link;
}

export default getLink;
