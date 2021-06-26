import { Injectable } from '@angular/core';

const storage = localStorage;

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  public async get(key: string): Promise<string | null> {
    return storage.getItem(key);
  }

  public async set(key: string, value: string): Promise<void> {
    storage.setItem(key, value);
  }

  public async getJson<T>(key: string): Promise<T | null> {
    const json = await this.get(key);
    if (json == null) return null;
    const data: T = JSON.parse(json);
    return data;
  }

  public async setJson<T>(key: string, data: T): Promise<void> {
    const json = JSON.stringify(data);
    await this.set(key, json);
  }

  public async remove(key: string): Promise<void> {
    storage.removeItem(key);
  }

  public async clear(): Promise<void> {
    storage.clear();
  }

  public get size() {
    return storage.length;
  }

  public getKey(index: number): string | null {
    return storage.key(index);
  }

  public getKeys() {
    const keys = this._getKeys();
    return keys;
  }

  public async getAll(): Promise<Record<string, string>> {
    const keys = this._getKeys();
    const data: Record<string, string> = {};
    for (const key of keys) {
      const value = storage.getItem(key);
      if (value != null) {
        data[key] = value;
      }
    }
    return data;
  }

  private _getKeys() {
    const a: string[] = [];
    for (let n = this.size, i = 0; i < n; i++) {
      const key = this.getKey(i);
      if (key != null) a.push(key);
    }
    return a;
  }
}
