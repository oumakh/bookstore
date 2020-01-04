import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {AppConst} from '../../constants/app-const';
import {RemoveBookService} from '../../services/remove-book.service';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  private bookId: number;
	private book: Book = new Book();
	private serverPath = AppConst.serverPath;
	private numberList: number[] = [1,2,3,4,5,6,7,8,9];
	private qty: number;

	private addBookSuccess: boolean = false;
	private notEnoughStock:boolean = false;

  constructor(
  	private bookService:BookService,
		private router:Router,
		private http:Http,
		private route:ActivatedRoute,
		private removeBookService: RemoveBookService,
      	public dialog:MatDialog
	  ) { }
	  
	  onSelect(book:Book) {
		this.router.navigate(['/editBook', this.book.id])
		// .then(s => location.reload())
		;
	  }
	  openDialog(book:Book) {
		let dialogRef = this.dialog.open(DialogResultExampleDialog);
		dialogRef.afterClosed().subscribe(
		  result => {
			console.log(result);
			if(result=="yes") {
			  this.removeBookService.sendBook(book.id).subscribe(
				res => {
				  console.log(res);
				  this.router.navigate(['/bookList']);
				}, 
				err => {
				  console.log(err);
				}
			  );
			}
		  }
		);
	  }

	 
  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		this.bookId = Number.parseInt(params['id']);
  	});

  	this.bookService.getBook(this.bookId).subscribe(
  		res => {
  			this.book=res.json();
  		},
  		error => {
  			console.log(error);
  		}
  	);

  	this.qty = 1;
  }

}

@Component({
	selector: 'dialog-result-example-dialog',
	templateUrl: './dialog-result-example-dialog.html'
  })
  export class DialogResultExampleDialog {
	constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) {}
  }
