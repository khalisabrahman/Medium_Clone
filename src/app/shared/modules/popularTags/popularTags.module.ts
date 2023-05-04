import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RouterModule } from "@angular/router";

import { GetPopularTagsEffect } from "./store/effects/getPopularTags.effect";
import { PopularTagsComponent } from "./components/popularTags/popularTags.component";
import { reducers } from "./store/reducers";
import { LoadingModule } from "../loading/loading.module";
import { ErrorMessageModule } from "../errorMessage/errorMessage.module";
import { PopularTagsService } from "./services/popularTags.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature("popularTags", reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    LoadingModule,
    ErrorMessageModule,
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
})
export class PopularTagsModule {}
