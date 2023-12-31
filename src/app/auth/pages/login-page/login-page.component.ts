import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthUrlEnum } from '../../enum';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private authService = inject( AuthService );
  private fb          = inject( FormBuilder );
  private router      = inject(Router);

  public registerUrl : string    = AuthUrlEnum.register;
  public isLoading               = signal<boolean>(false);
  public myForm      : FormGroup = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]]
  });

  public login() : void {
    this.isLoading.set(true);
    const { email, password } = this.myForm.value;
    
    this.authService.login(email, password).subscribe({
      next: ( success ) => {
        this.isLoading.set(false);
        this.router.navigateByUrl('dashboard');
      },
      error: ( errorMessage : string ) => {
        this.isLoading.set(false);
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          
        })
      }
    });
    
  }

  public isEmptyField() : boolean {
    if(this.myForm.get('email')?.hasError('required') || this.myForm.get('password')?.hasError('required')) {
      return true;
    }
    
    return false;
  }

}
