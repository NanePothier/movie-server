class NotFoundError {
  constructor(message) {
    this.status = 404;
    this.message = message;
  }
}

exports.NotFoundError = NotFoundError;
