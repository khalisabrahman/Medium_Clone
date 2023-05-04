import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'mc-global-feed',
    templateUrl: './globalFeed.component.html',
    styleUrls: ['./globalFeed.component.scss']
})

export class GlobalFeedComponent implements OnInit {
    apiUrl = '/articles'
    tagName: string;

    constructor(private route: ActivatedRoute) {}
    
    ngOnInit():void {
        this.tagName = this.route.snapshot.paramMap.get("slug");
    }
}