export function wait(time: number) {
    return new Promise<void>((resolve) => {
        window.setTimeout(resolve, time);
    });
}

export function waitAnimation(time?: number) {
    return new Promise((resolve) => {
        if (time) {
            window.setTimeout(() => {
                window.requestAnimationFrame(resolve);
            }, time);
        } else {
            window.requestAnimationFrame(resolve);
        }
    });
}

export async function retry(time: number, callback: () => Promise<boolean>) {
    let done = false;
    do {
        try {
            done = await callback();
            if (!done) {
                throw new Error('Attempt failed, trying again');
            }
        } catch (e) {
            await wait(time);
        }
    } while (!done);
}

type ExtendedFunction0<T> = (...args: any[]) => T;
type ExtendedFunction1<T, U> = (arg0: T) => U;
type ExtendedFunction2<T, U, V> = (arg0: T, arg1: U) => V;
type ExtendedFunction3<T, U, V, W> = (arg0: T, arg1: U, arg2: V) => W;
type ExtendedFunction4<T, U, V, W, X> = (arg0: T, arg1: U, arg2: V, arg3: W) => X;

export function debounce<T>(func: ExtendedFunction0<T>, wait: number, immediate?: boolean): () => void;
export function debounce<T, U>(func: ExtendedFunction1<T, U>, wait: number, immediate?: boolean): (arg0: T) => void;
export function debounce<T, U, V>(func: ExtendedFunction2<T, U, V>, wait: number, immediate?: boolean): (arg0: T, arg1: U) => void;
export function debounce<T, U, V, W>(func: ExtendedFunction3<T, U, V, W>, wait: number, immediate?: boolean): (arg0: T, arg1: U, arg2: V) => void;
export function debounce<T, U, V, W, X>(func: ExtendedFunction4<T, U, V, W, X>, wait: number, immediate?: boolean): (arg0: T, arg1: U, arg2: V, arg3: W) => void;
export function debounce(func: Function, wait: number, immediate?: boolean): Function {
    var timeout: number;
    var self = {};
    return function () {
        var args = arguments;
        var later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(self, args);
            }
        };
        var callNow = immediate && !timeout;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func.apply(self, args);
        }
    };
}


type ExtendedPromiseFunction0<T> = (...args: any[]) => Promise<T>;
type ExtendedPromiseFunction1<T, U> = (arg0: T) => Promise<U>;
type ExtendedPromiseFunction2<T, U, V> = (arg0: T, arg1: U) => Promise<V>;
type ExtendedPromiseFunction3<T, U, V, W> = (arg0: T, arg1: U, arg2: V) => Promise<W>;
type ExtendedPromiseFunction4<T, U, V, W, X> = (arg0: T, arg1: U, arg2: V, arg3: W) => Promise<X>;

type ExtendedPromise0<T> = () => Promise<T>;
type ExtendedPromise1<T, U> = (arg0: T) => Promise<U>;
type ExtendedPromise2<T, U, V> = (arg0: T, arg1: U) => Promise<V>;
type ExtendedPromise3<T, U, V, W> = (arg0: T, arg1: U, arg2: V) => Promise<W>;
type ExtendedPromise4<T, U, V, W, X> = (arg0: T, arg1: U, arg2: V, arg3: W) => Promise<X>;

/**
 * 
 * @param func
 * @param wait
 * @param thisArg
 * 
 * Takes in a function (A)
 * Returns a function (B)
 * Function (B) returns a Promise
 * Subsequent calls to Function (B) return same Promise
 * Promise resolves after wait time
 * Promise executes last call to function (A)
 * After wait time, Function (B) returns a new Promise
 * 
 */
export function debouncePromise<T>(func: ExtendedPromiseFunction0<T>, wait: number, thisArg?: any): ExtendedPromise0<T>;
export function debouncePromise<T, U>(func: ExtendedPromiseFunction1<T, U>, wait: number, thisArg?: any): ExtendedPromise1<T, U>;
export function debouncePromise<T, U, V>(func: ExtendedPromiseFunction2<T, U, V>, wait: number, thisArg?: any): ExtendedPromise2<T, U, V>;
export function debouncePromise<T, U, V, W>(func: ExtendedPromiseFunction3<T, U, V, W>, wait: number, thisArg?: any): ExtendedPromise3<T, U, V, W>;
export function debouncePromise<T, U, V, W, X>(func: ExtendedPromiseFunction4<T, U, V, W, X>, wait: number, thisArg?: any): ExtendedPromise4<T, U, V, W, X>;
export function debouncePromise(func: (...args: any[]) => any, wait: number, thisArg?: any): (...args: any[]) => Promise<any> {
    var self = thisArg || {};

    var args: any;
    var timeout: number;
    var promise: Promise<any>;
    var resolveExternal: any;

    return function () {
        args = arguments;

        // If there is no promise, create one
        if (!promise) {
            promise = new Promise<any>(function (resolve) {
                resolveExternal = resolve;
                timeout = window.setTimeout(function () {
                    timeout = undefined;
                    promise = undefined;
                    resolve(func.apply(self, args));
                }, wait);
            });
        } else {
            // There is a promise, so we need to reset the timeout
            if (timeout) {
                window.clearTimeout(timeout);
                timeout = window.setTimeout(function () {
                    timeout = undefined;
                    promise = undefined;
                    resolveExternal(func.apply(self, args));
                }, wait);
            } else {
                throw 'No Promise or Timeout for debouncePromise';
            }
        }
        return promise
    }
}