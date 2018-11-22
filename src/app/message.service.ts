import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  getMessages = () => this.messages;

  count = () => this.messages.length;

  add = (message: string) => this.messages.push(message);

  clear = () => this.messages = [];

}
