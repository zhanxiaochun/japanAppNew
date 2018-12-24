import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the ProductCart2orderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-cart2order',
  templateUrl: 'product-cart2order.html',
})
export class ProductCart2orderPage {

  token:string;
  cart:Array<any> = [];
  cartIds: Array<any> = [];
  address: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.token = this.appService.getToken();
    this.getCartShop();
    this.cartIds = navParams.get('ids');
    this.getAddress();
    console.log(this.address);
  }

  // 获取购物车-商城
  getCartShop(){
    let params = {
      token: this.token,
      type: 1,
      shopCartIds: this.cartIds.join(',')
    }
    this.appService.httpGet(AppGlobal.API.getCartProduct, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.cart = rs.data;
        this.cart['length'] = this.cart.length;
        //
        this.cart.forEach((val,key) => {
          this.cart[key]['attr'] = '';
          this.cart[key]['check'] = false;
          if(val['propertyX'] != null){
            console.log(val['propertyX']['attrValueList']);
            val['propertyX']['attrValueList'].forEach((v,k) => {
              this.cart[key]['attr'] += v['attrKey']['propertyname']+':'+v['attrValue']+' ';
            });
          }         
        });
      }
      console.log(this.cart);
    })
  }

  // 获取地址
  getAddress(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberGetAddress, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        for(let i = 0; i < rs.data.length; i++){
          if(rs.data[i]['isdefault'] == 1){
            this.address = rs.data[i];
            console.log(this.address);
            break;
          }
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCart2orderPage');
  }

}
