import { Component, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mediumPost: { title: string; link: string } | null = null;
  isLoading: boolean = true;
  error: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMediumPosts();
  }

  fetchMediumPosts() {
    const mediumUsername = 'jernej.klancic';
    const mediumRssWrapperUrl = `http://localhost:3000/api/feed/${mediumUsername}?size=1`;

    this.http.get<any>(mediumRssWrapperUrl).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.mediumPost = {
            title: response[0].title ?? 'Untitled',
            link: response[0].link ?? '#'
          };
        }
        this.isLoading = false; // Disable the loading state
      },
      error: (error) => {
        console.error('Failed to fetch RSS feed from Medium Wrapper', error);
        this.error = true;
        this.isLoading = false;
      }
    });
  }
}
