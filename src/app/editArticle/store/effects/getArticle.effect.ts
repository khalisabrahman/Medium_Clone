import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleService as SharedArticleService } from "src/app/shared/services/article.service";
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from "../actions/getArticle.action";

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({ article }); // effects will dispatch the action later when needed. For now, we return this line
          }),

          catchError(() => {
            return of(
              getArticleFailureAction() // // effects will dispatch the action later when needed. For now, we return this line
            );
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
    private router: Router
  ) {}
}
