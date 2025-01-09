import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../Services/movies.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent {
  popularMovies: any[] = [];
  searchResults: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  data: any;
  page: number = 1;

  constructor(private movieService: MoviesService,private router:Router) {}

  ngOnInit(): void {
    this.getPopularMovies();
    
  }

  getPopularMovies(): void {
    this.loading = true;
    this.movieService.getPopularMovies(this.page).subscribe(
      (data) => {
        console.log(data);
        
        this.data = data;
        this.popularMovies = data.results;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching popular movies:', error);
        this.loading = false;
      }
    );
  }

  searchMovies(): void {
    if (this.searchQuery.trim() === '') {
      this.getPopularMovies();
      return;
    }

    this.loading = true;
    this.movieService.searchMovies(this.searchQuery, this.page).subscribe(
      (data) => {
        this.data = data;
        this.searchResults = data.results;
        this.loading = false;
      },
      (error) => {
        console.error('Error searching movies:', error);
        this.loading = false;
      }
    );
  }

  changePage(page: number): void {
    if (page < 1 || (this.data && page > this.data.total_pages)) {
      return;
    }
    this.page = page;

    if (this.searchQuery.trim() === '') {
      this.getPopularMovies();
    } else {
      this.searchMovies();
    }
  }

  navigateToLogin(){
    this.router.navigateByUrl('/login')
  }
}
