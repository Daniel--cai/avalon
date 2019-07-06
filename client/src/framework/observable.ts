export interface IObserver<T> {}
export interface IObservable<T> {
  subscribe: (observer: IObserver<T>) => void;
}
