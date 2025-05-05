import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgFor, NgIf } from '@angular/common';

interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {
  repos: GithubRepo[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  fetchRepos(): void {
    this.loading = true;
    this.error = null;

    const apiUrl = 'https://api.github.com/users/jklancic/repos';
    this.http.get<GithubRepo[]>(apiUrl)
      .subscribe({
        next: (data) => {
          // Sort repos by most recently updated
          this.repos = data.sort((a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching repos:', error);
          this.error = 'Failed to load repositories. Please try again later.';
          this.loading = false;
        }
      });
  }

  getLanguageColor(language: string): string {
    // Extended language colors as on GitHub
    const colors: {[key: string]: string} = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'C#': '#178600',
      'C++': '#f34b7d',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'PHP': '#4F5D95',
      'Shell': '#89e051',
      'Vue': '#2c3e50',
      'Swift': '#ffac45',
      'Kotlin': '#F18E33'
    };

    return colors[language] || '#858585'; // Default color if not found
  }
}
