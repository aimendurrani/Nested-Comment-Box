import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";


@Component({
    selector: 'comment-form',
    templateUrl: './commentForm.component.html',
 
})
export class CommentFormComponent implements OnInit{
    @Input() submitLabel!:string;
    @Input() hasCancelButton: Boolean = false;
    @Input() initialText: string='';
    //sending data back to comments component
    @Output() handleSubmit = new EventEmitter<string>();
    @Output() handleCancel = new EventEmitter<void>();


    form!: FormGroup;
    //injecting reactive form 
    constructor(private fb: FormBuilder){}

    ngOnInit(): void {
        this.form = this.fb.group({
            title: [this.initialText, Validators.required]
        })
    }
    onSubmit():void{
        this.handleSubmit.emit(this.form.value.title);
        this.form.reset();
    }
}