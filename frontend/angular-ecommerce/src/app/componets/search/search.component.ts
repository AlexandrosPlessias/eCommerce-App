import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private keyword: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(keyword: string) {
    // console.log('Search keyword:' + keyword);
    this.router.navigateByUrl('/search/' + keyword).then(r => {return r;});
  }
}
