export class NotFoundError extends Error {
  __proto__: any;
  
  constructor(message: string) {
    super(message);
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "NotFoundError";
  }
}
