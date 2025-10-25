// Sistema central de armazenamento local (LocalStorage)
export const Storage = {
    save(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    load(key, fallback = []) {
      try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
      } catch {
        return fallback;
      }
    },
    clear(key) {
      localStorage.removeItem(key);
    }
  };
  