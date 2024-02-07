import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class SimpleDeque<T> {
  protected buffer: T[] = [];
  protected size = 10;

  public length(): number {
    return this.buffer.length;
  }

  public push(item: T): void {
    this.buffer.push(item)

    if (this.length() > this.size) {
      this.buffer = this.buffer.slice(1);
    }
  }

  public join(sep: string): string {
    return this.buffer.join(sep);
  }

  public includesSequence(sequence: T[]) {
    return this.join("").includes(sequence.join(""));
  }
}