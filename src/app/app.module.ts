import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { routerReducer } from "@ngrx/router-store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { TopBarModule } from "src/app/shared/modules/topBar/topBar.module";
import { PersistenceService } from "./shared/services/persistence.service";
import { AuthInterceptor } from "./shared/services/authinterceptor.service";
import { GlobalFeedModule } from "./globalFeed/globalFeed.module";
import { YourFeedModule } from "./yourFeed/yourFeed.module";
import { TagFeedModule } from "./tagFeed/tagFeed.module";
import { ArticleModule } from "./article/article.module.ts";
import { CreateArticleModule } from "./createArticle/createArticle.module";
import { EditArticleModule } from "./editArticle/editArticle.module";
import { SettingsModule } from "./settings/settings.module";
import { UserProfileModule } from "./userProfile/userProfile.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TopBarModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
