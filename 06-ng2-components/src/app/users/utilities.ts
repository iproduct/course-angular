export function resolvePromiseAfterTimeout <T> (result: T, timeout: number) {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => resolve(result), timeout);
    });
}
