import { Component } from '@angular/core';

@Component({
  selector: 'app-comming-soon',
  imports: [],
  templateUrl: './comming-soon.component.html',
  styleUrl: './comming-soon.component.css'
})
export class CommingSoonComponent {
  colors = ['#FFD700', '#FF69B4', '#00f2c3', '#FF4500', '#9370DB'];
  confettiCount = 50;

  constructor() { }

  ngOnInit(): void {
  }

  // Method to handle Notify Me click
  notifyUser(): void {
    alert("Thank you for signing up for notifications!");
  }

  // Method to generate confetti
  generateConfetti(): void {
    for (let i = 0; i < this.confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.opacity = Math.random().toString();
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(confetti);
    }
  }
}
