import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReviewsService {

  static api = "/api/reviews"

  constructor(private http: HttpClient) { }

  getReviews(): Observable<any> {
    return this.http.get(ReviewsService.api)
  }

  getReviewByReciever(id: number): Observable<any> {
    return this.http.get(`${ReviewsService.api}/provider/${id}`)
  }
  createReview(review): Observable<any>{
    return this.http.post(ReviewsService.api, review)
  }
}

