import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-role-select',
  standalone: false,
  templateUrl: './role-select.html',
  styleUrl: './role-select.scss'
})
export class RoleSelect implements OnInit {

  @Input() roles: string[] = [];

  public roleForm: FormGroup = new FormGroup({});

  public selectedRoles: string[] = [];

  public roleSelectLabel: string = 'Filter by role:';
  public roleSelectPlaceholder: string = 'Select a role';

  @Output() onRoleSelectChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onClearRoleSelect: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('roleSelect') roleSelect: NgSelectComponent;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      selectedRoles: new FormControl([])
    });
  }

  public focusSelectRole(): void {
    this.roleSelect.focus();
  }

  public onChangeRoles(roles: string[]): void {
    this.onRoleSelectChange.emit(this.selectedRoles);
  }

  public clearRoleSelect(): void {
    this.roleSelect.clearModel();
    this.onClearRoleSelect.emit(true);
  }
}
