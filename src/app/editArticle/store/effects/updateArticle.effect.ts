import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { ArticleInterface } from "src/app/shared/types/article.interface";
import { EditArticleService } from "../../services/editArticle.service";
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from "../actions/updateArticle.action";

@Injectable()
export class UpdateArticleEffect {
  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ slug, articleInput }) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({ article }); // effects will dispatch the action later when needed. For now, we return this line
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateArticleFailureAction({ errors: errorResponse.error.errors }) // // effects will dispatch the action later when needed. For now, we return this line
            );
          })
        );
      })
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(["/articles", article.slug]);
        })
      ),
    { dispatch: false } // We're not dispatching any action from this side effect. hence this dispatch: false
  );

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}
}
