import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Post} from './post.model'

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

}