import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MoviesListComponent } from "../movies-list/movies-list.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from "../profile/profile.component";
import { FooterComponent } from "../footer/footer.component";
import { FeedbackListComponent } from "../Admin/feedback-list/feedback-list.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, MoviesListComponent, RouterLink, CommonModule, FooterComponent, FeedbackListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  API_URL = "https://api.themoviedb.org/3/movie/upcoming"
  API_KEY = "21f05e908405701cea16ef2d76df0d47"
  

 

  data: any = []

  ngOnInit() {
    this.getMovies()
    console.log(this.data);
    
  }

  getMovies() {
    fetch(`${this.API_URL}?api_key=${this.API_KEY}`)
      .then(response => response.json())
      .then(data => {
        this.data = data.results
      })
  }
}
