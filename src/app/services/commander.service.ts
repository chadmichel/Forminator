import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { start } from 'repl';
import { RequestCommand } from '../dtos/request-command';
import { ResponseCommand } from '../dtos/response-command';
import { TableData } from '../dtos/table-data';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class CommanderService {
  constructor(private router: Router, private cache: CacheService) {}

  async processQueryCommand(
    query: string,
    provider: string = 'CACHE'
  ): Promise<ResponseCommand> {
    return this.processCommand({
      commandType: 'QUERY',
      query: query,
      provider: provider,
    });
  }

  async processCommand(command: RequestCommand): Promise<ResponseCommand> {
    // return new Promise<ResponseCommand>(async (success, failure) => {
    //   try {
    //     var response = await this.internalProcessCommand(command);
    //     this.cache.writeLastResponse(response);
    //     if (response.route) {
    //       this.router.navigate([response.route]);
    //     }
    //     success(response);
    //   } catch (err) {
    //     console.log(err);
    //     failure(err);
    //   }
    // });
    //return new Promise<ResponseCommand>(async (success, failure) => {
    try {
      var response = await this.internalProcessCommand(command);
      this.cache.writeLastResponse(response);
      if (response.route) {
        this.router.navigate([response.route]);
      }
      return response;
    } catch (err) {
      console.log(err);
      //failure(err);
    }
    //});
  }

  currentMenu() {
    var lastResponse = this.cache.readLastResponse();
    if (lastResponse != null && lastResponse.menu != null) {
      return lastResponse.menu;
    }
    return [
      {
        title: 'Sign up',
        route: 'signup',
      },
    ];
  }

  private async internalProcessCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    switch (command.commandType.toLowerCase()) {
      case 'start':
        return await this.startCommand(command);
      case 'query':
        return await this.queryCommand(command);
    }
  }

  private startCommand(command: RequestCommand): ResponseCommand {
    return {
      guid: command.guid,
      screen: 'DynamicTable',
      route: 'dt/contacts/allcontacts/cache',
      title: 'Contacts',
      dataProvider: 'CACHE',
      dataQueryText: '',
      selectItemCommand: 'OpenContact',
      data: {
        title: 'Contacts',
        columnHeaders: ['id', 'name', 'city'],
        rows: this.query('allcontacts'),
      },
    };
  }

  private async queryCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    let data: TableData;

    if (command.provider != null && command.provider.toLowerCase() == 'cache') {
      data = this.cache.readLastTableData();
      this.cache.clearLastResponse();
    }

    if (data == null) {
      data = await this.query(command.query);
    }
    return {
      guid: command.guid,
      title: 'Contacts',
      dataProvider: 'CACHE',
      selectItemCommand: 'OpenContact',
      data: data,
    };
  }

  private async query(queryName: string): Promise<TableData> {
    switch (queryName) {
      case 'allcontacts':
        return {
          title: 'Contacts',
          columnHeaders: ['id', 'name', 'city'],
          rows: [
            { id: '1', name: 'bob', city: 'Omaha' },
            { id: '2', name: 'mary', city: 'Omaha' },
          ],
        };
    }
  }
}

// rows: [
//   { id: '1', name: 'bob', city: 'Omaha' },
//   { id: '2', name: 'mary', city: 'Omaha' },
// ]
