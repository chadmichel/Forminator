import { Injectable } from '@angular/core';
import { ResponseCommand } from '../dtos/response-command';
import { TableData } from '../dtos/table-data';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  readString(key: string): string {
    return localStorage[key];
  }

  writeString(key: string, value: string) {
    localStorage[key] = value;
  }

  private LAST_RESPONSE_CACHE = 'LAST_RESPONSE_CACHE';

  readLastResponse(): ResponseCommand {
    const json = this.readString(this.LAST_RESPONSE_CACHE);
    if (json == null || json == '') {
      return null;
    }
    return JSON.parse(json) as ResponseCommand;
  }

  writeLastResponse(value: ResponseCommand) {
    return this.writeString(this.LAST_RESPONSE_CACHE, JSON.stringify(value));
  }

  readLastTableData(): TableData {
    var lastResponse = this.readLastResponse();
    if (lastResponse != null && lastResponse.data != null) {
      return lastResponse.data;
    }
    return null;
  }

  clearLastResponse() {
    this.writeString(this.LAST_RESPONSE_CACHE, null);
  }
}
