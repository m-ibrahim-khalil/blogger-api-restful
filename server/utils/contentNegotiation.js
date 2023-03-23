const js2xmlparser = require('js2xmlparser');
const json2html = require('json-to-html');
const { toPlainText } = require('json-to-plain-text');

class ContentNegotiation {
  constructor(res, statuscode, data) {
    this.res = res;
    this.statuscode = statuscode;
    this.data = data;
  }

  sendXMLResponse() {
    const xmlData = js2xmlparser.parse('data', this.data);
    return this.res.status(this.statuscode).send(xmlData);
  }

  sendTextResponse() {
    const textData = toPlainText(this.data, false, true);
    return this.res.status(this.statuscode).send(textData);
  }

  sendJsonResponse() {
    return this.res.status(this.statuscode).send(this.data);
  }

  sendHTMLResponse() {
    return this.res.status(this.statuscode).send(json2html(this.data, 4));
  }

  sendResponse() {
    return this.res.format({
      'text/xml': this.sendXMLResponse.bind(this),
      'application/json': this.sendJsonResponse.bind(this),
      'text/plain': this.sendTextResponse.bind(this),
      'text/html': this.sendHTMLResponse.bind(this),
      default: this.sendJsonResponse.bind(this),
    });
  }
}

module.exports = ContentNegotiation;
