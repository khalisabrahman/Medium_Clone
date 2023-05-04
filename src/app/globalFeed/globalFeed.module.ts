import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FeedModule } from "../shared/modules/feed/feed.module";
import { GlobalFeedComponent } from "./components/globalFeed/globalFeed.component";
import { BannerModule } from "../shared/modules/banner/banner.module";
import { PopularTagsModule } from "../shared/modules/popularTags/popularTags.module";
import { FeedTogglerModule } from "../shared/modules/feedToggler/feedToggler.module";

const routes = [
  {
    path: "",
    component: GlobalFeedComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule
  ],
  declarations: [GlobalFeedComponent],
})
export class GlobalFeedModule {}
