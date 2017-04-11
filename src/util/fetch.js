function fetch_soruce(path, page){
    this.$http.get(path + "?page=" + page).then(res => {
        return res.body
    })
}

function create_source(path, args) {
    this.$http.post(path, args).then(res => {
        return res.body
    })
}
module.exports = {
    fetch_soruce: fetch_soruce,
    create_source: create_source
}
