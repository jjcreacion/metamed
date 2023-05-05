import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})

export class SignInPage implements OnInit {
 
  user : any
  password : any
  ionicForm: FormGroup;
  isSubmitted = false;
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(
    private navCtrl: NavController,
    private route: Router,
    private router: ActivatedRoute,
    public formBuilder: FormBuilder,
    private auth : AuthService,
    private toastr: ToastrService,
    private translate: TranslateService
    ) 
    {
      this.router.queryParams.subscribe(params => {
        if(params.regist) 
        this.showSuccess("Successfully registered user");
      });
     }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      inputUser: [null, [Validators.required,Validators.minLength(5)]],
      inputPassword: [null, [Validators.required,Validators.minLength(8)]],
    });
  }
  

  async submitForm() {
    
    if (!this.ionicForm.valid) {

      this.isSubmitted = true;
      console.log(this.ionicForm)
      return false;

    } else {
      
      try{
        this.auth.login(this.user, this.password).then( resp => {
          if(resp!=null)
            this.route.navigate([`./tabs/home/`]);
          else
            this.showError("User or Password incorrect");  
        });
      }
      catch(error){
        console.log(error);
      }
      //this.route.navigate([`./home/`]);
    }
  }

  async loginGoogle() {
   
    try{
      this.auth.loginWithGoogle().then(res =>{
        if(res!=null){
        console.log("Register with Google");
        this.route.navigate([`./tabs/home/`]);
        }
      });
    }
    catch(error){
      console.log(error);
    }

  }

  loginFacebook(){

    try{
      
      this.auth.loginWithFacebook().then(res =>{
        if(res!=null){
        console.log("Register with Facebook");
        this.route.navigate([`./tabs/home/`]);
        }
      });
    }
    catch(error){
      console.log(error);
    }

  }

  routeTo(route: String){
    this.route.navigate([route])
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    }
    else {
      this.passwordToggleIcon = 'eye';
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  showSuccess(msj:string) {
    this.toastr.success(msj, '',{
      positionClass: 'toast-top-center',
    });
  }
  showError(msj:string) {
    this.toastr.error(msj, '',{
      positionClass: 'toast-top-center',
    });
  }

}
