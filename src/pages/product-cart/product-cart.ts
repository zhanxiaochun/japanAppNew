import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductCart2orderPage } from '../product-cart2order/product-cart2order';

/**
 * Generated class for the ProductCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-cart',
  templateUrl: 'product-cart.html',
})
export class ProductCartPage {

  token: string;
  cart: Array<any> = [];
  cart2: Array<any> = [];
  cart3: Array<any> = [];
  type1:boolean;
  type2:boolean;
  type3:boolean;
  type0:boolean;
  cartIds: Array<any> = [];
  coin:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
    this.token = this.appService.getToken();
    this.getCartShop();
    this.getCartAmazon();
    this.getCartRatuken();
    this.type1 = this.type2 = this.type3 = this.type0 = false;
    this.coin = AppGlobal.coin;
  }

  // 获取购物车-商城
  getCartShop(){
    let params = {
      token: this.token,
      type: 1
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

  // 获取购物车-亚马逊
  getCartAmazon(){
    let params = {
      token: this.token,
      type: 2
    }
    this.appService.httpGet(AppGlobal.API.getCartProduct, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.cart2 = rs.data;
        this.cart2['length'] = this.cart2.length;
        //
        this.cart2.forEach((val,key) => {
          this.cart2[key]['attr'] = '';
          this.cart2[key]['check'] = false;
          if(val['property'] != null){
            console.log(val['property']['attrValueList']);
            val['property']['attrValueList'].forEach((v,k) => {
              this.cart2[key]['attr'] += v['attrKey']['propertyname']+':'+v['attrValue']+' ';
            });
          }         
        });
      }
      console.log(this.cart2);
    })
  }

  // 获取购物车-亚马逊
  getCartRatuken(){
    let params = {
      token: this.token,
      type: 3
    }
    this.appService.httpGet(AppGlobal.API.getCartProduct, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.cart3 = rs.data;
        this.cart3['length'] = this.cart3.length;
        //
        this.cart3.forEach((val,key) => {
          this.cart3[key]['attr'] = '';
          this.cart3[key]['check'] = false;
          if(val['property'] != null){
            console.log(val['property']['attrValueList']);
            val['property']['attrValueList'].forEach((v,k) => {
              this.cart3[key]['attr'] += v['attrKey']['propertyname']+':'+v['attrValue']+' ';
            });
          }         
        });
      }
      console.log(this.cart3);
    })
  }

  // 加
  plus(num,id,key,type){
    
    let params = {
      token: this.token,
      id: id,
      amount: Number(num) + 1,
    }
    this.appService.httpPost(AppGlobal.API.updateCartAmount, params, rs=>{
      if(rs.code == 200){
        if(type == 1){
          this.cart[key]['amount'] = Number(num) + 1;
        }else if(type == 2){
          this.cart2[key]['amount'] = Number(num) + 1;
        }else if(type == 3){
          this.cart3[key]['amount'] = Number(num) + 1;
        }
        
      }
    })
  }

  // 减
  reduce(num,id,key,type){
    let params = {
      token: this.token,
      id: id,
      amount: Number(num) - 1,
    }
    this.appService.httpPost(AppGlobal.API.updateCartAmount, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        if(type == 1){
          this.cart[key]['amount'] = Number(num) - 1;
        }else if(type == 2){
          this.cart2[key]['amount'] = Number(num) - 1;
        }else if(type == 3){
          this.cart3[key]['amount'] = Number(num) - 1;
        }
      }
    })
  }

  // 选择产品
  selectProduct(id){
    if(this.cartIds.length > 0){
      let ishave = false;
      for(let i = 0; i < this.cartIds.length; i++){
        if(this.cartIds[i] == id){
          ishave = false;
          //删除
          this.cartIds.splice(i,1);
        }else{
          ishave = true;
        }
      }
      if(ishave){
        this.cartIds.push(id);
      }
    }else{
      this.cartIds.push(id);
    }
    console.log(this.cartIds);
  }

  // 选择商品 - 分类全选
  checktype(cate,type){
    console.log(type);
    if(cate == 1){
      for(let i = 0; i < this.cart.length; i++){
        this.cart[i]['check'] = type;
        this.selectProduct(this.cart[i]['id']);
      }
    }else if(cate == 2){
      for(let i = 0; i < this.cart2.length; i++){
        this.cart2[i]['check'] = type;
        this.selectProduct(this.cart2[i]['id']);
      }
    }else if(cate == 3){
      for(let i = 0; i < this.cart3.length; i++){
        this.cart3[i]['check'] = type;
        this.selectProduct(this.cart3[i]['id']);
      }
    }
  }

  // 全选
  checkall(type){
    this.type0 = this.type1 = this.type2 = this.type3 = type;
    if(type){
      // console.log('sd');
      for(let i = 0; i < this.cart.length; i++){
        this.cart[i]['check'] = type;
        this.cartIds.push(this.cart[i]['id']);
      }
      for(let j = 0; j < this.cart2.length; j++){
            this.cart2[j]['check'] = type;
            this.cartIds.push(this.cart2[j]['id']);
      }
      for(let k = 0; k < this.cart3.length; k++){
            this.cart3[k]['check'] = type;
            this.cartIds.push(this.cart3[k]['id']);
      }
    }else{
      this.cartIds = [];
      for(let i = 0; i < this.cart.length; i++){
        this.cart[i]['check'] = type;
      }
      for(let j = 0; j < this.cart2.length; j++){
        this.cart2[j]['check'] = type;
      }
      for(let k = 0; k < this.cart3.length; k++){
        this.cart3[k]['check'] = type;
      }
    }
    console.log(this.cartIds);
  }

  // // 生成订单
  // createOrders(){
  //   let params = {
  //     token: this.token,
  //     shopCartIds: this.cartIds.join(','),
  //     note: ''
  //   }
  //   this.appService.httpPost(AppGlobal.API.createOrder, params, rs=>{
  //     console.log(rs);
  //     if(rs.code == 200){
  //       this.appService.alert('success');
  //     }
  //   })
  // }

  // 确认订单
  confirmOrder(){
    this.navCtrl.push(ProductCart2orderPage,{
      ids:this.cartIds
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCartPage');
  }


}
