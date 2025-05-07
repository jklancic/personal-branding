import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  // TODO: Use environment variables for the Medium username and RSS wrapper URL
  fetchMediumPosts() {
    const mediumUsername = 'jernej.klancic';
    const mediumRssWrapperUrl = `https://klancic.me/api/feed/${mediumUsername}?size=1`;

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
