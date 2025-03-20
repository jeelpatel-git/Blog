import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading:boolean = false;
    private authStatusSub: Subscription;
    constructor(public fb : FormBuilder, private authService: AuthService) {
    
        }

    ngOnInit(): void {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
              this.isLoading = false;
            }
          );
        this.loginForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        })
    }

    onLogin() {
        if(this.loginForm.valid){
            this.isLoading = true;
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
        }
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
      }
}