import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { environment }  from  '../../environments/environment'

@Component({
  selector: 'app-chatbot',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userInput = '';
  isLoading = false;
  messages: { role: 'user' | 'assistant', text: string }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ role: 'user', text: input });
    this.userInput = '';
    this.isLoading = true;

    const payload = {
      messages: this.messages.map(m => ({
        role: m.role,
        content: m.text
      }))
    };

    this.http.post<{ reply: string }>(`${environment.apiBaseUrl}/api/chat`, payload)
      .subscribe({
        next: res => {
          this.messages.push({ role: 'assistant', text: res.reply });
          this.isLoading = false;
        },
        error: err => {
          console.error('Chat error:', err);
          this.messages.push({ role: 'assistant', text: '⚠️ Something went wrong.' });
          this.isLoading = false;
        }
      });
  }
}