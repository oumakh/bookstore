import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/components/home/home.component';
import {MyAccountComponent} from '../app/components/my-account/my-account.component';
import {SignUpComponent} from '../app/components/sign-up/sign-up.component';
import {ForgetPasswordComponent} from '../app/components/forget-password/forget-password.component';
import {MyProfileComponent} from '../app/components/my-profile/my-profile.component';
import {BookListComponent} from '../app/components/book-list/book-list.component';
import {BookDetailComponent} from '../app/components/book-detail/book-detail.component';
import {AddNewBookComponent} from '../app/components/add-new-book/add-new-book.component';
import {EditBookComponent} from '../app/components/edit-book/edit-book.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path: 'home',
    component: HomeComponent
},
{
  path: 'myAccount',
  component: MyAccountComponent
},
{
  path: 'signUp',
  component: SignUpComponent
},
{
  path: 'forgetPassword',
  component: ForgetPasswordComponent
},
{
  path: 'myProfile',
  component: MyProfileComponent
},
{
  path: 'bookList',
  component: BookListComponent
},
{
  path: 'bookDetail/:id',
  component: BookDetailComponent
},
{
  path: 'addNewBook',
  component: AddNewBookComponent
},
{
  path: 'editBook/:id',
  component: EditBookComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
