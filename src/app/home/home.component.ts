import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  mediumPosts: { title: string; link: string }[] = []; // To store the blog posts
  isLoading: boolean = true; // To show a loading state
  error: boolean = false; // To show an error state, if any

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

          const items = Array.from(xml.querySelectorAll('item')); // Get all `<item>` elements
          this.mediumPosts = items.slice(0, 3).map((item) => ({
            title: item.querySelector('title')?.textContent ?? 'Untitled',
            link: item.querySelector('link')?.textContent ?? '#'
          }));

          this.isLoading = false;
        },
        error: () => {
          console.error('Failed to fetch RSS feed from Medium');
          this.error = true;
          this.isLoading = false;
        }
      });
  }
}
