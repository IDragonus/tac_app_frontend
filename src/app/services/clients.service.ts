import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  readonly APIUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getClientsList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'clients/');
  }

  newClient(val: any) {
    console.log('service', val);
    return this.http.post(this.APIUrl + 'clients/', val);
  }

  atenerClient(id: any, body: any) {
    return this.http.put(this.APIUrl + `clients/${id}/`, body);
  }
}
