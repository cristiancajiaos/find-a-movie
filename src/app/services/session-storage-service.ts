import { Service } from '@angular/core';

@Service()
export class SessionStorageService {
  public setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data): null;
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
