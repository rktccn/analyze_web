let debounceTimer = null;

export function debounce(callback, duration) {
    return function (...args) {
        let ctx = this
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            callback.apply(ctx, args)
        }, duration)
    }
}

