//contains all the methods that work w the api
//this is like a default service for our module

import { Injectable } from "@angular/core";
import { CommentInterface } from "../types/comment.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CommentsService{
    constructor(private httpClient: HttpClient){}
    //fetch
    getComments():Observable<CommentInterface[]>{
        return this.httpClient.get<CommentInterface[]>('http://localhost:3000/comments');
    }

    //saving a comment
    createComment(text: string,parentId: null|string): Observable<CommentInterface>{
        return this.httpClient.post<CommentInterface>('http://localhost:3000/comments', {
            body:text,
            parentId,
            //should not be set here
            createdAt: new Date().toISOString(),
            userId:'1',
            username:'Jhon',

        })
    }
    updateComment(id:string, text:string): Observable<CommentInterface>{
        return this.httpClient.patch<CommentInterface>(`http://localhost:3000/comments/${id}`, {
            body:text,
        })       
    }
    deleteComment(id:string): Observable<{}> {
        return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
    }
}
