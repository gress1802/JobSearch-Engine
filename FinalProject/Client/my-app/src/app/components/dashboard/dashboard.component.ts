import { Component, OnInit } from '@angular/core';
import { JobSearchService } from '../../services/job-search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jobs : any[] = [];
  selectedJob : any;
  query? : string;

  constructor (private jobSearchService: JobSearchService) { }

  ngOnInit() {
    this.jobSearchService.getSavedJobs().subscribe( (jobs) => {
      this.jobs = jobs.jobs;
    });
  }

  viewDetails(job : any) {
    this.selectedJob = {
      MatchedObjectDescriptor: {
        OrganizationName: job.organization_name,
        PositionLocationDisplay: job.location,
        UserArea: {
          Details: {
            JobSummary: job.description
          }
        },
        QualificationSummary: job.qualifications,
        PositionURL: job.link
      }
    };
  }

  getAllSavedJobs() : any{
    this.jobSearchService.getSavedJobs().subscribe( (jobs) => {
      return jobs;
    });
  }

  removeSavedJob(job: any) {
    this.jobSearchService.removeSavedJob(job).subscribe( () => {
      this.ngOnInit();
    });
  }

  removeAllSavedJobs(event : MouseEvent) {
    this.jobSearchService.removeAllSavedJobs().subscribe(
      () => {
        this.buttonAnimation(event);
        this.ngOnInit();
      },
      (error) => {
        console.error('Error removing all jobs:', error);
      }
    );
  }

  buttonAnimation(event: MouseEvent) {
    const button = event.target as HTMLElement;
    button.classList.add('button-clicked');
    setTimeout(() => {
      button.classList.remove('button-clicked');
    }, 100);
  }

  searchJobList() {
    if (!!this.query) {
      this.jobSearchService.searchJobs(this.query).subscribe( (jobs) => {
        this.jobs = jobs;
      });
    }
    if (this.query === '') {
      this.ngOnInit();
    }
  }
}

