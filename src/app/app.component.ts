import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import {Post} from './post.model'
import {PostService} from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Post[] = [];
  isFetching : boolean = false;

  constructor(private http: HttpClient, private postService : PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.CreateAndSavePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.isFetching = true;
    this.http.get('https://ng-complete-guide-80c93.firebaseio.com/posts.json').pipe(
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
    ).subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
    })
  }
  
}
