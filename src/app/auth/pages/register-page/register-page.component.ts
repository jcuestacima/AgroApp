import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  selectedRole: number;
  showBankAccountInput: boolean = false;

  constructor() {
    this.selectedRole = 0;
  }

  roleSelected(role: number) {
    this.selectedRole = role;

    if (role === 1) {
      this.showBankAccountInput = true;
    } else {
      this.showBankAccountInput = false;
    }
  }

}
