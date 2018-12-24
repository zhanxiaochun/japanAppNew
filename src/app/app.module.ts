import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ComponentsModule } from '../components/components.module';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
// import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AppService } from './app.service';
// import { AppMember } from './app.member';
import { ListPageModule } from '../pages/list/list.module';
import { ProductDetailPageModule } from '../pages/product-detail/product-detail.module';
import { ProductListPageModule } from '../pages/product-list/product-list.module';
import { ProductAttrPageModule } from '../pages/product-attr/product-attr.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { SetupPageModule } from '../pages/setup/setup.module';
import { MemberPageModule } from '../pages/member/member.module';
import { MemberNicknamePageModule } from '../pages/member-nickname/member-nickname.module';
import { PasswordLoginPageModule } from '../pages/password-login/password-login.module';
import { PasswordPayPageModule } from '../pages/password-pay/password-pay.module';
import { MemberAddressPageModule } from '../pages/member-address/member-address.module';
import { MemberAddressaddPageModule } from '../pages/member-addressadd/member-addressadd.module';
import { ProductCartPageModule } from '../pages/product-cart/product-cart.module';
import { ProductCart2orderPageModule } from '../pages/product-cart2order/product-cart2order.module';

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage,
    // ListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    ListPageModule,
    ProductDetailPageModule,
    ProductListPageModule,
    ProductAttrPageModule,
    LoginPageModule,
    RegisterPageModule,
    SetupPageModule,
    MemberPageModule,
    MemberNicknamePageModule,
    PasswordLoginPageModule,
    PasswordPayPageModule,
    MemberAddressPageModule,
    MemberAddressaddPageModule,
    ProductCartPageModule,
    ProductCart2orderPageModule,
    // IonicModule.forRoot(MyApp), // 隐藏子页面tabs
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',
      // backButtonText: '返回'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage,
    // ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppService,
    // AppMember,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
