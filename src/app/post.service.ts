import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Post} from './post.model'
import {map, catchError} from 'rxjs/operators'
import {Subject, throwError}  from 'rxjs'

@Injectable({ providedIn : 'root'})
export class PostService
{
  error = new Subject<string>();

  constructor (private http : HttpClient){}

  public CreateAndSavePost(title : string, content : string)
  {
    const postData : Post  = {title : title, content : content};
    this.http
      .post(
        'https://ng-complete-guide-80c93.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error =>{
        this.error.next(error.message);
      });
  }

  public fetchPosts(){
    let httpParams : HttpParams= new HttpParams();
    httpParams = httpParams.append('print', 'preety');
    httpParams = httpParams.append('custom', 'ket');
    return this.http.get('https://ng-complete-guide-80c93.firebaseio.com/posts.json',
    {
      headers : new HttpHeaders({'My-Header': 'Hello'}),
      params : httpParams,
      responseType : 'json'
    }).pipe(
      map((responseData : {[key: string]: Post}) => {
        const postArray :Post[] = [];
          for(const key in responseData)
          {
            if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id : key});
            }
          }
          return postArray;
        }), catchError(err =>{
          return throwError(err);
        })
    )
  }

  public clearPosts()
  {
    return this.http.delete('https://ng-complete-guide-80c93.firebaseio.com/posts.json');
  }


}