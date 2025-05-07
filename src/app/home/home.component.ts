import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mediumPost: { title: string; link: string, pubDate: string, categories: [] } | null = null;
  isLoading: boolean = true;
  error: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMediumPosts();
  }

  /**
   * Fetches the latest Medium posts using the RSS wrapper API.
   * The API URL is constructed using the Medium username from the environment configuration.
   * The response is expected to be an array of posts, and the first post's details are stored in the mediumPost property.
   * If an error occurs during the fetch, it sets the error state to true and logs the error to the console.
   */
  fetchMediumPosts() {
    const mediumRssWrapperUrl = `${environment.mediumRssWrapperUrl}/api/feed/${environment.mediumUsername}?size=1`;

    this.http.get<any>(mediumRssWrapperUrl).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.mediumPost = {
            title: response[0].title ?? 'Untitled',
            link: response[0].link ?? '#',
            pubDate: response[0].pubDate ?? 'Undefined',
            categories: response[0].categories ?? [],
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
