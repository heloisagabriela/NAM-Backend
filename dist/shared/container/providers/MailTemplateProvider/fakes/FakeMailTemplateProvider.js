"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeTemplateMailTemplateProvider {
  async parse() {
    return 'Mail Content';
  }

}

exports.default = FakeTemplateMailTemplateProvider;