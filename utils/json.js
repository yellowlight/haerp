function errJson(errcode, text) {
    return { 'errcode': errcode, 'text': text, 'status': false };
}

module.exports.errJson = errJson;
