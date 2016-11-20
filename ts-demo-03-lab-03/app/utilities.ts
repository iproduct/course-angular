export function resolvePromiseAfterTimeout <T> (result: T, timeout: number) {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => resolve(result), timeout);
    });
}

export const a = 5;

export default 15;
