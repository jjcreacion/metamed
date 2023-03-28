import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {
  phone: any;
  password2: any;
  gender: string = "female";
  ionicForm: FormGroup;
  isSubmitted = false;

  user = {
    name: null,
    email: null,
    phone: null,
    password : null,
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
    )
   { 
    
    this.route.queryParams.subscribe(params => {
      if(params.phone) this.phone = params.phone
    }) 

  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      userName: [null, [Validators.required,Validators.minLength(3)]],
      userPhone: [null, [Validators.required,Validators.minLength(5)]],
      userEmail: [null, [Validators.required,Validators.minLength(5)]],
      userPassword: [null, [Validators.required,Validators.minLength(8)]],
      userPassword2: [null, [Validators.required,Validators.minLength(8)]]
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }  
  
  async submitForm() {
    
    if (!this.ionicForm.valid) {

      this.isSubmitted = true;
      console.log(this.ionicForm)
      return false;

    } 
    else {
      alert("Enviar");
    }
  }

  verification() {
      this.router.navigate(['./verification']);
    } 
}
