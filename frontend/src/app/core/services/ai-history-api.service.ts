import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { inject, Injectable } from "@angular/core";

@Injectable({

    providedIn:'root'

})

export class AiHistoryApiService {

    private http = inject(HttpClient);

    private api =

        `${environment.apiUrl}/ai/history`;

    getHistory(){

        return this.http.get<any>(

            this.api

        );

    }

    saveHistory(

        history:any

    ){

        return this.http.post(

            this.api,

            history

        );

    }

}