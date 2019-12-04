const redis = require("redis");
const { promisify } = require("util");

class Redis {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
  }
  async set(key, val, expireTime) {
    if (expireTime) {
      await this.client.set(key, val, "EX", expireTime);
      return;
    }
    await this.client.set(key, val);
  }
  async get(key) {
    return await this.getAsync(key);
  }
  close() {
    this.client.end(true);
  }
}

const redisCli = new Redis();

module.exports = redisCli;
