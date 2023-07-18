function jsonResponse(status = 500, data = {}, message = "", errors = [], url = ""){
    this.status = status;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.url = url;
}

module.exports = {
    jsonResponse
}