import { Injectable, inject } from '@angular/core';

import {

    HttpClient,

    HttpParams

} from '@angular/common/http';

import {

    Observable

} from 'rxjs';
import { environment } from '../../../environments/environment';
import { SnippetFilter } from '../../../core/models/snippets/snippet-filter.interface';
import { SnippetResponse } from '../../../core/models/snippets/snippet-response.interface';
import { SnippetDetailResponse } from '../../../core/models/snippets/snippet-detail-response.interface';
import { UpdateCodeSnippet } from '../../../core/models/snippets/update-code-snippet.interface';
import { CreateCodeSnippet } from '../../../core/models/snippets/create-code-snippet.interface';




@Injectable({

    providedIn: 'root'

})
export class CodeSnippetApiService {

    private http = inject(HttpClient);

    private api =

        `${environment.apiUrl}/snippets`;


        getSnippets(

    filters?: SnippetFilter

): Observable<SnippetResponse> {

    let params = new HttpParams();

    if (filters) {

        Object.entries(filters).forEach(

            ([key, value]) => {

                if (

                    value === undefined ||

                    value === null

                ) {

                    return;

                }

                if (

                    Array.isArray(value)

                ) {

                    params = params.set(

                        key,

                        value.join(",")

                    );

                }

                else {

                    params = params.set(

                        key,

                        String(value)

                    );

                }

            }

        );

    }

    return this.http.get<SnippetResponse>(

        this.api,

        {

            params

        }

    );

}


getSnippet(

    id: string

): Observable<SnippetDetailResponse> {

    return this.http.get<SnippetDetailResponse>(

        `${this.api}/${id}`

    );

}

getFavoriteSnippets(): Observable<SnippetResponse> {

    return this.http.get<SnippetResponse>(

        `${this.api}/favorites`

    );

}

createSnippet(

    snippet: CreateCodeSnippet

): Observable<SnippetDetailResponse> {

    return this.http.post<SnippetDetailResponse>(

        this.api,

        snippet

    );

}


updateSnippet(

    id: string,

    updates: UpdateCodeSnippet

): Observable<SnippetDetailResponse> {

    return this.http.put<SnippetDetailResponse>(

        `${this.api}/${id}`,

        updates

    );

}

deleteSnippet(

    id: string

): Observable<{

    success: boolean;

    message: string;

}> {

    return this.http.delete<{

        success: boolean;

        message: string;

    }>(

        `${this.api}/${id}`

    );

}


toggleFavorite(

    id: string

): Observable<SnippetDetailResponse> {

    return this.http.patch<SnippetDetailResponse>(

        `${this.api}/${id}/favorite`,

        {}

    );

}
    incrementUsage(

    id: string

): Observable<SnippetDetailResponse> {

    return this.http.patch<SnippetDetailResponse>(

        `${this.api}/${id}/use`,

        {}

    );

}

}