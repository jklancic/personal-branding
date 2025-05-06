import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  mediumPost: { title: string; link: string } | null = null;
  isLoading: boolean = true;
  error: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMediumPosts();
  }

  /**
   * Fetch Medium RSS Feed and extract blog post titles and links
   */
  fetchMediumPosts() {
    const rssUrl = 'https://medium.com/feed/@jernej.klancic';
    const proxyUrl = 'https://api.allorigins.win/get?url='; // Proxy to bypass CORS

    this.http
      .get<any>(`${proxyUrl}${encodeURIComponent(rssUrl)}`)
      .subscribe({
        next: (response) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(response.contents, 'application/xml');

          // Get the first `<item>` element
          const firstItem = xml.querySelector('item');
          if (firstItem) {
            this.mediumPost = {
              title: firstItem.querySelector('title')?.textContent ?? 'Untitled',
              link: firstItem.querySelector('link')?.textContent ?? '#'
            };
          }

          this.isLoading = false; // Disable the loading state
        },
        error: () => {
          console.error('Failed to fetch RSS feed from Medium');
          this.error = true;
          this.isLoading = false;
        }
      });
  }
}
