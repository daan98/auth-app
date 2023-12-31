import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { AuthUrlEnum } from '../../enum';
import { ValidatorService } from '../../services/validator.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  
  private fb               = inject( FormBuilder );
  private validatorService = inject( ValidatorService );
  private authService      = inject( AuthService );
  private router           = inject( Router );

  public loginUrl : string    = AuthUrlEnum.login;
  public isLoading            = signal<boolean>(false);
  public myForm   : FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
    password2: ['', [ Validators.required, Validators.minLength(8) ]]
  }, {
    validators: [ this.validatorService.areFieldsEquals('password', 'password2') ]
  });

  public register() : void {
    this.isLoading.set(true);
    const { name, email, password, password2 } = this.myForm.value;

    this.authService.register(email, name, password, password2).subscribe({
      next: (success) => {
        this.isLoading.set(false);
        this.router.navigateByUrl(AuthUrlEnum.dashboard)
      },
      error: (errorMessage) => {
        this.isLoading.set(false);
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error"
        });
      }
    });
  }

  public isEmptyField() : boolean {
    if(
      this.myForm.get('name')?.hasError('required') ||
      this.myForm.get('email')?.hasError('required') ||
      this.myForm.get('password')?.hasError('required')
      ) {
        return true;
      }
      
    return false;
  }
}
