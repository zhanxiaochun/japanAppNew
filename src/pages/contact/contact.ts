import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { SetupPage } from '../setup/setup';
import { AppService, AppGlobal } from '../../app/app.service';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  token: string;
  member: Array<any> = [];

  constructor(public navCtrl: NavController, public appService: AppService) {
    this.ionViewWillEnter();
    this.getMenberInfo();
  }

  login(){
    console.log('login');
    this.navCtrl.push(LoginPage);
  }

  register(){
    console.log('register');
    this.navCtrl.push(RegisterPage);
  }

  // 提取token
  ionViewWillEnter(){
    this.token=window.localStorage.getItem('token');
    console.log(this.token);
  }

  // 获取会员信息
  getMenberInfo(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberInfo, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.member = rs.data;
      }
    })
  }

  // 设置
  goSetup(){
    this.navCtrl.push(SetupPage);
  }

  // 退出登录
  logout(){
    window.localStorage.removeItem('token');
    this.navCtrl.setRoot(LoginPage);
}

}
