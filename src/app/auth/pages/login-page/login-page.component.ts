import { Component, inject } from '@angular/core';
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
  public myForm      : FormGroup = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]]
  });

  public login() : void {
    const { email, password } = this.myForm.value;

    console.log({email, password});

    this.authService.login(email, password).subscribe({
      next: ( success ) => this.router.navigateByUrl('dashboard'),
      error: ( errorMessage : string ) => {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          
        })
      }
    });
    
  }

}
