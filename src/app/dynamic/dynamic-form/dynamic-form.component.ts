import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommanderService } from 'src/app/services/commander.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private commander: CommanderService
  ) {}

  ngOnInit(): void {}
}
