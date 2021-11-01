import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ChatBotService} from "./chat-bot.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  displayedColumns = ['id', 'name', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(private service: ChatBotService) {

  }

  ngOnInit(): void {
    this.service.getUserData().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this. matSort;
      console.log('response is', response);
    })
  }
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

}
