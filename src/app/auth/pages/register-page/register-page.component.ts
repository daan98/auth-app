import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUrlEnum } from '../../enum';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  
  private fb = inject( FormBuilder );

  public loginUrl : string    = AuthUrlEnum.login;
  public myForm   : FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
    passwordRepeated: ['', [ Validators.required, Validators.minLength(8) ]]
  });

  public register() : void {
    console.log( this.myForm.value );
    // CHECK PASSWORD FIELDS HAVE SAME VALUE

    // CREATE USER 
  }
}
