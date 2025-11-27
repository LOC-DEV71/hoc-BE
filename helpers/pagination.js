module.exports = (objectPagination, query, countProducts) =>{
    if(objectPagination.currentPage < 1){
        objectPagination.currentPage = 1;
    }

    const totalProducts = Math.ceil(countProducts/objectPagination.limitItem);
    objectPagination.totalPage = totalProducts;
    
    if(query.page){
        objectPagination.currentPage = Number(query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItem;

    return objectPagination;
}