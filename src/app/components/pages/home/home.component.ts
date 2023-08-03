import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/Moments';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  searchTerm: string = '';
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  constructor(private momentService: MomentService) { }

  ngOnInit() {
    this.momentService.getMoments()
      .subscribe((items) => {
        const data = items.data;
        data.map((item) => {
          item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
        })
        this.allMoments = data;
        this.moments = data;
      })
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value);
    });
  }
}
