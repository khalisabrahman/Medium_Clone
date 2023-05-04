import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { authReducer, reducers } from "src/app/auth/store/reducers";

import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from "./services/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "./store/effects/register.effect";
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module";
import { PersistenceService } from "../shared/services/persistence.service";
import { LoginEffect } from "./store/effects/login.effect";
import { GetCurrentUserEffect } from "./store/effects/getCurrentUser.effect";
import { UpdateCurrentUserEffect } from "./store/effects/updateCurrentUser.effect";
import { LogoutEffect } from "./store/effects/logout.effect";

const routes = [
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    // StoreModule.forFeature('authsss', reducers), // Will also work
    StoreModule.forFeature("authsss", authReducer), // 'authsss' can be called anything really. This is to put a 'authsss' state property in the redux dev tools
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
    ]),
    BackendErrorMessagesModule,
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
