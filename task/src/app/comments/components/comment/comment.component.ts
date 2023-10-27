import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CommentInterface } from "../../types/comment.interface";
import { ActiveCommentTypeEnum } from "../../types/activeCommentType.enum";
import { ActiveCommentInterface } from "../../types/activeComment.interface";


@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',

})
export class CommentComponent implements OnInit {
    @Input() currentUserId!: string;
    @Input() replies!: CommentInterface[];
    @Input() comment!: CommentInterface; 
    @Input() activeComment!: ActiveCommentInterface|null;
    @Input() parentId : string|null = null;

    @Output() setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
    @Output() addComment = new EventEmitter<{text: string, parentId:string|null}>();
    @Output() updateComment = new EventEmitter<{text: string, commentId:string}>();
    @Output() deleteComment = new EventEmitter<string>();

    canReply: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    replyId : string | null = null;

    activeCommentType = ActiveCommentTypeEnum;

 //   @Output() setActiveComment = new EventEmitter<{ id: string, type: string }>();

    ngOnInit(): void {
        const fiveMinutes = 300000;
        const timePassed = new Date().getTime() - new Date(this.comment.createdAt).getTime() > fiveMinutes;
        this.canReply = Boolean(this.currentUserId);
        this.canEdit = this.currentUserId === this.comment.userId && !timePassed;
       this.canDelete = this.currentUserId === this.comment.userId && !timePassed 
        && this.replies.length === 0;
        this.replyId = this.parentId ? this.parentId : this.comment.id;
    }
    isReplying(): boolean {
        if (!this.activeComment){
            return  false;
        }
        return this.activeComment.id === this.comment.id 
        && this.activeComment.type === this.activeCommentType.replying
    }

    isEditing(): boolean {
        if (!this.activeComment){
            return  false;
        }
        return this.activeComment.id === this.comment.id 
        && this.activeComment.type === this.activeCommentType.editing
    }

}
