import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';  // Make sure FormsModule is imported here
import { AuthService } from '../_services/auth.service';
import { JsonPipe } from '@angular/common';
import { AlertifyService } from '../_services/alertify.service';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../_models/user';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[CommonModule, FormsModule, NgIf, NgClass, NgForOf,BsDatepickerModule, JsonPipe, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  user!: User;
  registerForm!: FormGroup;
  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup)
  {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {'mismatch': true};
  }

  
  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe({
        next: () => {
          this.alertify.success('Registration successful');
        }
        , error: (err: any) => {
          this.alertify.error(err);
        }, complete: () => {
          this.authService.login(this.user).subscribe({
            next: () => {
              this.router.navigate(['/members']);
            },
            error: (err: any) => {
              this.alertify.error(err);
            }
          });
        }
      })
    }
    console.log(this.registerForm.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("Cancelled");
  }
}
