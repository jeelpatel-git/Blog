import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit , OnDestroy{
    signupForm: FormGroup;
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
    
    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
      }
}