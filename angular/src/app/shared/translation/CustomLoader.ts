import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

export class CustomLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  
  public getTranslation(lang: String): Observable<any> {
    return this.http.get(`http://51.91.23.157:500/localization/${lang}`).map(
      (res: any) => {
        return res;
      }
    );
  }
}
