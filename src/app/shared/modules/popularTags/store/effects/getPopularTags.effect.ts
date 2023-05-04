import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { PopularTagsService } from "../../services/popularTags.service";
import {
  getPopularTagsAction,
  getPopularTagsActionFailure,
  getPopularTagsActionSuccess,
} from "../actions/getPopularTags.action";
import { PopularTagType } from "src/app/shared/types/popularTag.type";

@Injectable()
export class GetPopularTagsEffect {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsActionSuccess({ popularTags }); // effects will dispatch the action later when needed. For now, we return this line
          }),

          catchError(() => {
            return of(
              getPopularTagsActionFailure() // // effects will dispatch the action later when needed. For now, we return this line
            );
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
