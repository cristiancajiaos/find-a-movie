import { Component, OnInit, ViewChild, ChangeDetectionStrategy, OutputEmitterRef, InputSignal, input, output, inject, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faCircleInfo, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-role-select',
  standalone: false,
  templateUrl: './role-select.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './role-select.scss'
})
export class RoleSelect implements OnInit {

  private fb = inject(FormBuilder);

  public roleForm: FormGroup = new FormGroup({});

  public circleInfo: IconDefinition = faCircleInfo;

  public roleSelectLabel: string = 'Filter by role:';
  public roleSelectPlaceholder: string = 'Select one or various roles';

  roles: InputSignal<string[]> = input.required<string[]>();

  onRoleSelectChange: OutputEmitterRef<string[]> = output<string[]>();
  onClearRoleSelect: OutputEmitterRef<boolean> = output<boolean>();

  enabledParams: WritableSignal<string> = signal('Enabled queryParam roles');

  @ViewChild('roleSelect') roleSelect: NgSelectComponent;

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      selectedRoles: new FormControl([])
    });
  }

  public focusSelectRole(): void {
    this.roleSelect.focus();
  }

  public setRoles(roles: string[]) {
    this.roleForm.controls['selectedRoles'].setValue(roles);
  }

  public onChangeRoles(roles: string[]): void {
    const selectedRolesControl = this.roleForm.controls['selectedRoles'];
    selectedRolesControl.setValue(roles);
    this.onRoleSelectChange.emit(selectedRolesControl.value);
  }

  public clearRoleSelect(): void {
    this.roleSelect.clearModel();
    this.onClearRoleSelect.emit(true);
  }
}
