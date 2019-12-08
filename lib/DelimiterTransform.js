var stream = require('stream');

class DelimiterTransform extends stream.Transform {
  constructor(options) {
    super({
      writableObjectMode: true,
      readableObjectMode : false,
      encoding: 'utf8'  
    });

    this._delimiter = options.delimiter || ',';
    this._started = false;
  }

  _transform(chunk, encoding, cb) {
    for (var key in chunk) {
      if (!this._started) {
        this.push(`${chunk[key]}`);
        this._started = true;
      } else {
        this.push(this._delimiter);
        this.push(`${chunk[key]}`);
      }
    }
    cb();
  }

}

module.exports = DelimiterTransform;