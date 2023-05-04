import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ErrorMessageModule } from "../shared/modules/errorMessage/errorMessage.module";
import { LoadingModule } from "../shared/modules/loading/loading.module";
import { TagListModule } from "../shared/modules/tagList/tagList.module";

import { ArticleService  as SharedArticleService} from "../shared/services/article.service";
import { ArticleComponent } from "./components/article/article.component";
import { ArticleService } from "./services/article.service";
import { DeleteArticleEffect } from "./store/effects/deleteArticle.effect";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { reducers } from "./store/reducers";

const routes = [
  {
    path: "articles/:slug",
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("article", reducers),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    LoadingModule,
    ErrorMessageModule,
    TagListModule
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
