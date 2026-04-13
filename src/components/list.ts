import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-list")
export class List extends LitElement {
  @property({attribute: false})
  myList: string[] = []

  render() {
    const data = this.myList.map((item) => html `
      <div>
        ${item}
        <button @click=${() => this.handleDelete(item)}>Delete</button>
        <button @click=${() => this.handleEdit(item)}>Edit</button>
      </div>
    `)
    const renderData = html `<div>${data}</div>`

    return renderData
  }

  private handleEdit(item: string) {
    this.dispatchEvent(
      new CustomEvent('edit-item', {
        detail: { item },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleDelete(item: string) {
    this.dispatchEvent(
      new CustomEvent('delete-item', {
        detail: { item },
        bubbles: true,
        composed: true
      })
    );
  }
}
