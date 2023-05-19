// 자바스크립트의 내장 클래스들은 ES6이전 코드로 안정적으로 변환이 안됨
// 위 문제로 인해 내장 객체를 확장 했더라도 instanceof 의 작동이 안됨으로
// Object.setPrototypeOf(this, CustomClass.prototype) 으로 직접 체이닝 연결이 필요함
// 참고 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): ApiError[];
}

export class ValidationError extends CustomError {
  statusCode = 400;
  errors: ApiError[];

  constructor(errors: ApiError[]) {
    super('Input validation failed');
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super(`Unauthorized`);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor() {
    super(`Forbidden`);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(resourceName?: string) {
    super(resourceName ? `Resource not found : ${resourceName}` : 'Not Found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
export class MethodNotAllowedError extends CustomError {
  statusCode = 405;

  constructor() {
    super('Method Not Allowed');
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
