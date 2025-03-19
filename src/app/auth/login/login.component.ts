import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading:boolean = false;

    constructor(public fb : FormBuilder, private authService: AuthService) {
    
        }

    ngOnInit(): void {
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
}