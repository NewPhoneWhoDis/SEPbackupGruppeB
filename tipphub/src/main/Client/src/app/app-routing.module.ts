import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { homePage } from "./components/pages/homePage/homePage";


const routes: Routes = [{ path: "", component: homePage }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
