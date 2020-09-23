"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class DiskStorageProvider {
  constructor() {
    this.storage = [];
  }

  async saveFile(fileName) {
    this.storage.push(fileName);
    return fileName;
  }

  async deleteFile(file) {
    const findIndex = this.storage.findIndex(storageFile => storageFile === file);
    this.storage.splice(findIndex, 1);
  }

}

var _default = DiskStorageProvider;
exports.default = _default;