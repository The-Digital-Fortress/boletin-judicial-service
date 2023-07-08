function jsonResponse(status = false, data = {}, message = "", errors = []){
    this.status = status;
    this.data = data;
    this.message = message;
    this.errors = errors;
}

module.exports = {
    jsonResponse
}