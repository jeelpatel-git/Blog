import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    isLoading:boolean = false;

    constructor(public fb : FormBuilder, private authService: AuthService) {

    }

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        })
    }

    onSignup() {
        if(this.signupForm.valid){
            this.isLoading = true;
            this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);
        }
    }
}