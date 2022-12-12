import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { betroundPage } from "./components/pages/betroundPage/betroundPage";
import { homePage } from "./components/pages/homePage/homePage";

const routes: Routes = [
  { path: "", component: homePage },
  { path: "bets-and-pieces", component: betroundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
