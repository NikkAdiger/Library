import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class BasicApi {

  private baseUrl = 'http://localhost:8081/';

  constructor(public http: HttpClient) {
  }

  getUrl(url: string) {

    return this.baseUrl + url;
  }

  getBasicApi(key: string): Observable<any> {

    return this.http.get(this.getUrl(key));
  }

  postBasicApi(key: string, data: any): Observable<any> {

    return this.http.post(this.getUrl(key), data);
  }

  putBasicApi(key: string, data: any): Observable<any> {

    return this.http.put(this.getUrl(key), data);
  }

  deleteBasicApi(key: string, id: string): Observable<any> {

    return this.http.delete(this.getUrl(key) + '/' + id);
  }
}
