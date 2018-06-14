import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { UtilsService } from '../../providers/utils.service';
import { LoginService } from '../../providers/login.service';
import { SchoolService } from '../../providers/school.service';
import { RoleSelectPage } from '../../pages/role-select/role-select';
import { HomePage } from '../../pages/home/home';
import { SchoolPage } from '../../pages/school/school';
import { ProfilePage } from '../../pages/profile/profile';
import { Page } from '../../model/page';
import { School } from '../../model/school';
import {MesaService} from "../../providers/mesa.service";
import {MesaPage} from "../mesa/mesa";
import {Mesa} from "../../model/mesa";
import {Role} from "../../model/role";

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  public rootPage: Component;
  public homePage: Page;
  public schoolPage: Page;
  public mesaPage: Page;

  public myRole: Role;
  public role = Role;

  constructor(
    public navController: NavController,
    public translateService: TranslateService,
    public utilsService: UtilsService,
    public ionicService: IonicService,
    public schoolService: SchoolService,
    public mesaService: MesaService,
    private loginService: LoginService) {

    this.rootPage = HomePage;
    this.homePage = new Page(HomePage, this.translateService.instant('HOME.TITLE'));
    this.schoolPage = new Page(SchoolPage, this.translateService.instant('SCHOOL.TITLE'));
    this.mesaPage = new Page(MesaPage,this.translateService.instant('MESA.TITLE'));
    this.myRole = this.utilsService.role;
  }
  /**
   * Method for opening a page
   * @param {Page} page Page to open
   */
  public openPage(page: Page): void {
    this.nav.setRoot(page.component);
  }

  /**
   * Method for calling the logout service
   */
  public logout(): void {
    this.loginService.logout().subscribe(
      success => this.nav.setRoot(RoleSelectPage),
      error => location.reload());
  }

  /**
   * Method for displaying the profile page
   */
  public showProfile(): void {
    this.navController.push(ProfilePage);
  }

  /**
   * Method called from the home page to open the details of the
   * school of the current user
   * @param {School} school to open
   */
  public goToSchool(): void {

    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.schoolService.getMySchool().subscribe(
      ((value: School) => this.navController.push(SchoolPage, { school: value })),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        this.ionicService.removeLoading();
      });
  }

  public vesAlaMesa(): void {

    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.mesaService.getMyMesa().subscribe(
      ((value: Mesa) => this.navController.push(MesaPage, { mesa: value })),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        this.ionicService.removeLoading();
      });
  }
}
