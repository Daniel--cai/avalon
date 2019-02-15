export interface Request<T> {
  (event: T): T;
  type: string;
}
