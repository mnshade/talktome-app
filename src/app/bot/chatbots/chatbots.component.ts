import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const dialogflowURL = 'https://us-central1-pizza-bot-lqrjjy.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'app-chatbots',
  templateUrl: './chatbots.component.html',
  styleUrls: ['./chatbots.component.css']
})
export class ChatbotsComponent implements OnInit {

  messages = [];
  loading = false;

  sessionId = Math.random().toString(36).slice(-5);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.addBotMessage('Olá, me envie sua dúvida. ');
  }

  handleUserMessage(event) {
    console.log(event);
    const text = event.message;
    this.addUserMessage(text);

    this.loading = true;

    this.http.post<any>(
      dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            text,
            languageCode: 'pt-br'
          }
        }
      }
    )
    .subscribe(res => {
      this.addBotMessage(res.fulfillmentText);
      this.loading = false;
    });
  }

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'Você',
      reply: true,
      date: new Date()
    });
  }

  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Agulhão',
      avatar: '/assets/images/agulhaoLogo.svg',
      date: new Date()
    });
  }

}
