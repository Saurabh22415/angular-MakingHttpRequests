import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import {Post} from './post.model'
import {PostService} from './post.service';
import {Subscription }  from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts : Post[] = [];
  isFetching : boolean = false;
  error = null;
  private errorSub : Subscription;

  constructor(private http: HttpClient, private postService : PostService) {}

  ngOnInit() {
    this.errorSub= this.postService.error.subscribe(errorMessage =>{
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts =>
    {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error =>{
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post) {
    this.postService.CreateAndSavePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts =>
    {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error =>{
      this.error = error.message;
    });
  }

  onClearPosts() {
   this.postService.clearPosts().subscribe(()=>
   {
     this.loadedPosts = [];
   });
  }

  ngOnDestroy()
  {
    this.errorSub.unsubscribe();
  }
  
}
