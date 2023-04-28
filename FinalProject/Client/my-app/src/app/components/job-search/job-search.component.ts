import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobSearchService } from '../../services/job-search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css'],
})
export class JobSearchComponent implements OnInit, AfterViewInit {

  keyword: string = '';
  location: string = '';
  jobCategory: string = '';
  payGradeHigh: string = '';
  payGradeLow: string = '';
  jobs : any[] = [];
  selectedJob: any;

  constructor(private http : HttpClient, private jobService : JobSearchService, private userService : UserService) { }

  viewDetails(job : any) {
    this.selectedJob = job;
  }

  ngOnInit() {
    this.searchJobs();
  }

  //This is for a smooth rendering of the footer
  ngAfterViewInit() {
    setTimeout(() => {
      const footer = document.querySelector('app-footer');
      if (footer) {
        footer.classList.add('visible');
      }      
    }, 1000);
  }

  searchJobs() {
    this.jobService.getJobs(this.keyword, this.location, this.jobCategory, this.payGradeLow, this.payGradeHigh)
      .subscribe(
        (data: any) => {
          this.jobs = data.SearchResult.SearchResultItems;
        },
        (error: any) => {
          console.error('Error fetching jobs:', error);
        }
      );
  }

  saveJob(job : any, event: MouseEvent) {
    this.jobService.saveJob(job).subscribe(
      (data: any) => {
      },
      (error: any) => {
        console.error('Error saving job:', error);
      }
    );
    this.buttonAnimation(event);
  }

  buttonAnimation(event: MouseEvent) {
    const button = event.target as HTMLElement;
    button.classList.add('button-clicked');
    setTimeout(() => {
      button.classList.remove('button-clicked');
    }, 200);;
  }

  //This is a function that will show the user recommendations based on their career and skills (max skills is 3 or less)
  showRecommendations(event : MouseEvent) {
    this.userService.getAuthUser().subscribe(
      (user: any) => {
        const maxSkills = 3;
        const skills = user.skills.split(',').slice(0, maxSkills).join(', ');

        //combine with interpolation
        const searchString = `${user.career}, ${skills}`;

        this.jobService.getJobs(searchString, '', '', '', '').subscribe(
          (data: any) => {
            this.jobs = data.SearchResult.SearchResultItems;
          }
        );
        this.keyword = "";
        this.buttonAnimation(event);
    });
  }
}
