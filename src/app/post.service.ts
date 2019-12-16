import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Post} from './post.model'
import {map} from 'rxjs/operators'

@Injectable({ providedIn : 'root'})
export class PostService
{
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
      });
  }

  public fetchPosts(){
    return this.http.get('https://ng-complete-guide-80c93.firebaseio.com/posts.json').pipe(
      map((responseData : {[key: string]: Post}) => {
        const postArray :Post[] = [];
          for(const key in responseData)
          {
            if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id : key});
            }
          }
          return postArray;
        })
    )
  }

  public clearPosts()
  {
    return this.http.delete('https://ng-complete-guide-80c93.firebaseio.com/posts.json');
  }

}