import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http : HttpClient) {

  }
  /* Saida JSON de modelo de dados, apenas exemplo vai ser trocado com do Bot*/
  getUserData(){
    return this.http.get('https://jsonplaceholder.typicode.com/comments?postId=1')
  }
}
