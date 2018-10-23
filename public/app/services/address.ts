import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AddressService {
    private defaultUrl = 'https://restcountries.eu/rest/v2';
    private countrySubject: BehaviorSubject<string[]>;

    constructor(private http: HttpClient) {
        this.countrySubject = new BehaviorSubject([]);
        this.init();
    }

    private init() {
        this.http.get(`${this.defaultUrl}/all`)
            .pipe(map((data: any) => data.map((item: any) => <string>item.name)))
            .subscribe((data) => {
                this.countrySubject.next(data);
            });
    }

    getCountries(): Observable<string[]> {
        return this.countrySubject.asObservable();
    }
}
