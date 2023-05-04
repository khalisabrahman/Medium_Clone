import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { ArticleInterface } from "src/app/shared/types/article.interface";
import { CreateArticleService } from "../../services/createArticle.service";
import {
  createArticleSuccessAction,
  createArticleAction,
  createArticleFailureAction,
} from "../actions/createArticle.action";

@Injectable()
export class createArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({ article }); // effects will dispatch the action later when needed. For now, we return this line
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({ errors: errorResponse.error.errors }) // // effects will dispatch the action later when needed. For now, we return this line
            );
          })
        );
      })
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(["/articles", article.slug]);
        })
      ),
    { dispatch: false } // We're not dispatching any action from this side effect. hence this dispatch: false
  );

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
