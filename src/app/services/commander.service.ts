import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { RequestCommand } from '../dtos/request-command';
import { ResponseCommand } from '../dtos/response-command';
import { TableData } from '../dtos/table-data';
import { CacheService } from './cache.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CommanderService {
  constructor(private router: Router, private cache: CacheService) {}

  async processQueryCommand(
    query: string,
    provider: string = 'CACHE'
  ): Promise<TableData> {
    return (
      await this.processCommand({
        commandType: 'QUERY',
        query: query,
      })
    ).data;
  }

  async processCommand(command: RequestCommand): Promise<ResponseCommand> {
    return new Promise<ResponseCommand>(async (success, failure) => {
      try {
        command.guid = uuidv4();
        var response = this.internalProcessCommand(command);
        this.cache.writeLastResponse(command, response);
        if (response.route) {
          this.router.navigate([response.route]);
        }
        success(response);
      } catch (err) {
        console.log(err);
        failure(err);
      }
    });
  }

  currentMenu() {
    var lastResponse = this.cache.readLastResponse();
    if (lastResponse != null && lastResponse.menu != null) {
      return lastResponse.menu;
    }
    return [
      {
        title: 'Home',
        route: 'home',
      },
      {
        title: 'Sign up',
        route: 'signup',
      },
    ];
  }

  private internalProcessCommand(command: RequestCommand): ResponseCommand {
    switch (command.commandType.toLowerCase()) {
      case 'start':
        return this.startCommand(command);
      case 'query':
        return this.queryCommand(command);
    }
  }

  private startCommand(command: RequestCommand): ResponseCommand {
    return {
      guid: command.guid,
      route: 'dt/contacts/allcontacts',
      title: 'Contacts',
    };
  }

  private queryCommand(command: RequestCommand): ResponseCommand {
    let data: TableData;

    if (data == null) {
      data = this.query(command.query);
    }

    return {
      guid: command.guid,
      title: 'Contacts',
      data: data,
    };
  }

  private query(queryName: string): TableData {
    switch (queryName) {
      case 'allcontacts':
        return {
          title: 'Contacts',
          columnHeaders: ['id', 'name', 'city'],
          selectItemCommand: 'OpenContact',
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
