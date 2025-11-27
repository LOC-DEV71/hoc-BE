module.exports = (query) => {
    let fillterStatus = [
        {
            name: "Tất cả",
            status: "",
        },
        {
            name: "Còn hàng",
            status: "active",
        },
        {
            name: "Hết hàng",
            status: "unactive",
        }
    ]

    // cách tối ưu hơn
    if(query.status){
        const index = fillterStatus.findIndex(item => item.status === query.status);
        fillterStatus[index].class = "active";
    }else{
        const index = fillterStatus.findIndex(item => item.status === "");
        fillterStatus[index].class = "active";
    }

    return fillterStatus;
}
