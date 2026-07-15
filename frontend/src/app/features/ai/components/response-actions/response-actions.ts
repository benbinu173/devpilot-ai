import {
  Component,
  input,
  output,
  signal
} from '@angular/core';

@Component({
  selector: 'app-response-actions',
  standalone: true,
  imports: [],
  templateUrl: './response-actions.html',
  styleUrl: './response-actions.css'
})
export class ResponseActions {

  content = input('');

  copy = output<void>();
  regenerate = output<void>();
  save = output<void>();
  like = output<void>();
  dislike = output<void>();

  copied = signal(false);
  liked = signal(false);
  disliked = signal(false);

  onCopy(): void {
    this.copy.emit();
    this.copied.set(true);
    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }

  onLike(): void {
    this.liked.update(v => !v);
    if (this.liked()) this.disliked.set(false);
    this.like.emit();
  }

  onDislike(): void {
    this.disliked.update(v => !v);
    if (this.disliked()) this.liked.set(false);
    this.dislike.emit();
  }
}