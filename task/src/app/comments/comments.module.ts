import { NgModule } from "@angular/core";
import { CommentsComponent } from "./components/comments/comments.component";
import { CommentsService } from "./services/comments.service";
import { CommonModule } from "@angular/common";
import { CommentComponent } from "./components/comment/comment.component";
import { CommentFormComponent } from "./components/commentForm/commentForm.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
    //the components we allow to be viewed outside
    exports: [CommentsComponent],
    providers: [CommentsService],
})
export class CommentsModule {}