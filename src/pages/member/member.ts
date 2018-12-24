import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { MemberNicknamePage } from '../member-nickname/member-nickname';

/**
 * Generated class for the MemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  token: string;
  member: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.ionViewWillEnter();
    this.getMemberInfo();
  }

  // 提取token
  ionViewWillEnter(){
    this.token=window.localStorage.getItem('token');
    console.log(this.token);
  }

  // 获取用户信息
  getMemberInfo(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberInfo, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.member = rs.data;
        this.member['avatar'] = 'https://www.icooder.cn/static/images/member/default_face.png';
      }else{
        console.log('获取信息失败');
      }
    })
  }

  // 修改昵称
  goNickname(){
    this.navCtrl.push(MemberNicknamePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }

}
