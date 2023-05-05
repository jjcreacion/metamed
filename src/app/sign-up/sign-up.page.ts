import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {
  
@ViewChild('slides', { static: false }) slides: IonSlides;

showPassword = false;
passwordToggleIcon = 'eye';
  
slideOpts = {
  initialSlide: 0
};
regist = false
msj:any;
ionicForm: FormGroup;
isSubmitted = false;
email: any;
password: any;

  constructor(
    private route: Router,
    public formBuilder: FormBuilder,
    private auth : AuthService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      inputEmail: [null, [Validators.required,Validators.minLength(5)]],
      inputPassword: [null, [Validators.required,Validators.minLength(8)]],
    });
  }

  verification() {
    this.route.navigate(['./verification']);
  } 

  changeSlide(index) {
    this.slides.slideTo(index)
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }

  async submitForm() {
    
    if (!this.ionicForm.valid) {

      this.isSubmitted = true;
      console.log(this.ionicForm)
      return false;

    } 
    else {
      this.register();
    }
  }

  async register(){
    
    try{
      this.auth.register(this.email,this.password).then(res =>{
        
        if (res == "auth/email-already-in-use") 
          this.showWarning("The email address is already in use");
        else if (res == "auth/invalid-email") 
          this.showWarning("The email address is not valid.");
        else if (res == "auth/operation-not-allowed") 
          this.showWarning("Operation not allowed.");
        else if (res == "auth/weak-password") 
          this.showWarning("The password is too weak.");
        else if(res.additionalUserInfo.isNewUser){
          
          this.regist = true
          this.route.navigateByUrl(`/sign-in?regist=${this.regist}`, {skipLocationChange: true}).then(() => {
            try {
              this.route.navigate([`/sign-in?regist=${this.regist}`]);
            } catch (error) {
              console.log("nada sigue caminando")
            }
          });
        }
        
        console.log(res);
      });
    }
    catch(error){
      console.log("error");
    }

  }

  agregarPerfil(){

    const perfil: any = {
      biografia: "biografia",
      correo: "correo",
      facebook: "facebook",
      instagram: "instagram",
      nombre: "nombre",
      telefono: "telefono",
      twitter: "twitter",
      uid: "uid"
    }

  }
  
  get errorControl() {
    return this.ionicForm.controls;
  }

  showWarning(msj:string) {
    this.toastr.warning(msj, '',{
      positionClass: 'toast-top-center',
    });
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

}
