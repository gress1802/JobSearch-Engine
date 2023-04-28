import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  constructor(private http : HttpClient) { }

  //This is a service that will be used to search for jobs
  getJobs(keyword: string, location: string, jobCategory: string, payGradeLow: string, payGradeHigh: string) : Observable<any> {
    return this.http
      .get('/api/v1/jobs', {
        params: {
          keyword: keyword,
          location: location,
          jobCategory: jobCategory,
          payGradeHigh: payGradeHigh,
          payGradeLow: payGradeLow,
        },
    });
  }

  saveJob(job : any) : Observable<any> {
    let curJob = {
      position_title: job.MatchedObjectDescriptor.PositionTitle,
      organization_name: job.MatchedObjectDescriptor.OrganizationName,
      low_range: job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange,
      high_range: job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange,
      remuneration: job.MatchedObjectDescriptor.PositionRemuneration[0].Description,
      location: job.MatchedObjectDescriptor.PositionLocation[0].LocationName,
      description: job.MatchedObjectDescriptor.UserArea.Details.JobSummary,
      qualifications: job.MatchedObjectDescriptor.QualificationSummary,
      link: job.MatchedObjectDescriptor.PositionURI,
    }
    return this.http
      .post('/api/v1/jobs', curJob);
  }

  getSavedJobs() : Observable<any> {
    return this.http
      .get('/api/v1/savedJobs');
  }

  //This is a service that will be used to remove a job from the saved jobs list (jobId is send in the body)
  removeSavedJob(job : any) : Observable<any> {
    const params = new HttpParams().set('jobId', job._id);
    return this.http
      .delete('/api/v1/savedJobs', {
        params
    });
  }

  //This is a service for deleting all jobs from the saved jobs list
  removeAllSavedJobs() : Observable<any> {
    return this.http
      .delete('/api/v1/savedJobs/all');
  }

  //This is a service for searching through a job list
  searchJobs(query : string) : Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http
      .get('/api/v1/savedJobs/list', {
        params
    });
  }
}
