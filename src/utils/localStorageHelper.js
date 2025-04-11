export class LocalStorageHelper {
    static async get(key) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.error(`localStorage.get: 無法解析 JSON（key: ${key}）`, e);
        return [];
      }
    }
    static async set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error(`localStorage.set: 設定失敗（key: ${key}）`, e);
        return false;
      }
    }
    static async remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error(`localStorage.remove: 移除失敗（key: ${key}）`, e);
        return false;
      }
    }
}