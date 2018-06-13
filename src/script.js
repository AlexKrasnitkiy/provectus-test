const filterByExpiration = (items) => {
    // change this function to return only current items
    // where expirationDate > today's date
    var today = new Date();
    today.getTime();

    _.remove(items, function (item) {
        item.expirationDate = moment(item.expirationDate, "MM-DD-YYYY").toDate("MM-DD-YYYY");
        return item.expirationDate < today;
    });

    _.forEach(items, function (item) {
       item.expirationDate =  moment(item.expirationDate, "MM-DD-YYYY").format("MM-DD-YYYY");
    });

    return items;
}