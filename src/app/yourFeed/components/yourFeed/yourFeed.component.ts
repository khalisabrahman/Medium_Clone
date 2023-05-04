import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'mc-your-feed',
    templateUrl: './yourFeed.component.html',
    styleUrls: ['./yourFeed.component.scss']
})

export class YourFeedComponent implements OnInit {
    apiUrl = '/articles/feed'
    tagName: string;

    constructor(private route: ActivatedRoute) {}
    
    ngOnInit():void {
        this.tagName = this.route.snapshot.paramMap.get("slug");
    }
}