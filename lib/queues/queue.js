class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    this.size += 1;
    if (!this.front) {
      this.front = this.rear = node;
      return;
    }
    this.rear.next = node;
    this.rear = this.rear.next;
  }

  dequeue() {
    if (this.size === 0) throw new Error("Sorry! Can't dequeue from empty queue");
    if (this.size === 1) this.rear = null;
    const value = this.front.value;
    this.front = this.front.next;
    this.size -= 1;
    return value;
  }

  peek() {
    if (this.front) return this.front.value;
  }
}

// queue = new Queue;
// queue.enqueue(1);
// console.log(queue);
// queue.enqueue(2);
// console.log(queue);
// console.log(queue.dequeue());
// console.log(queue.dequeue());
// console.log(queue);
