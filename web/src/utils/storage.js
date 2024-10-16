const storageKey = '__storage__dy__';

const Storage = {
  // 存储数据
  set(key, value, expire = null) {
    key = storageKey + key;
    const data = {
      value: value,
      timestamp: new Date().getTime(),
      expire: expire ?? null // 如果有expire，才设定过期时间（秒）
    };
    localStorage.setItem(key, JSON.stringify(data));
  },

  // 读取数据
  get(key) {
    key = storageKey + key;
    const dataStr = localStorage.getItem(key);
    if (!dataStr) return null;

    const data = JSON.parse(dataStr);
    // 如果有设定过期时间且已经过期
    if (data.expire && new Date().getTime() > data.expire) {
      localStorage.removeItem(key); // 移除已过期的数据
      return null;
    }

    return data.value;
  },

  // 删除数据
  remove(key) {
    localStorage.removeItem(key);
  },

  // 清除所有 localStorage
  clear() {
    localStorage.clear();
  }
};

export default Storage;
