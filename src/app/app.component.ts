import { Component } from '@angular/core';
import { MenuItem } from './dtos/menu-item';
import { CommanderService } from './services/commander.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Forminator';

  public links: MenuItem[] = [];
  public showDebug = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private commander: CommanderService
  ) {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  async ngAfterViewInit() {
    this.links = this.commander.currentMenu();
  }

  enableDebug() {
    this.showDebug = true;
  }
  disableDebug() {
    this.showDebug = false;
  }
}
