// 자바스크립트의 내장 클래스들은 ES6이전 코드로 안정적으로 변환이 안됨
// 위 문제로 인해 내장 객체를 확장 했더라도 instanceof 의 작동이 안됨으로
// Object.setPrototypeOf(this, CustomClass.prototype) 으로 직접 체이닝 연결이 필요함
// 참고 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
// https://github.com/microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getMessage(): string {
    return this.message;
  }
}

export class ValidationError extends CustomError {
  statusCode = 400;

  constructor({ field, message }: { field?: string; message?: string }) {
    let _message: string = message || '';
    if (!_message) {
      message = field ? `Input validation failed : ${field}` : 'Bad Request';
    }
    super(_message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(message?: string) {
    super(message ? message : `Unauthorized`);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(message?: string) {
    super(message ? message : `Forbidden`);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor({
    resourceName,
    message,
  }: {
    resourceName?: string;
    message?: string;
  }) {
    let _message: string = message || '';
    if (!_message) {
      _message = resourceName
        ? `Resource not found : ${resourceName}`
        : 'Not Found';
    }
    super(_message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
export class MethodNotAllowedError extends CustomError {
  statusCode = 405;

  constructor(message?: string) {
    super(message ? message : 'Method Not Allowed');
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }
}
