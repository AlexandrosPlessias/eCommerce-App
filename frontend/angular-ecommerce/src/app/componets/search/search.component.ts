import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('mySearchInput', { static: true }) keyword: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch() {
    // console.log('Search keyword:' + this.keyword);
    this.router.navigateByUrl('/search/' + this.keyword.nativeElement.value).then(r => {return r;});
    this.keyword.nativeElement.value = "";
  }
}
