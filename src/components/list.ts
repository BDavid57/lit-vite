import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-list")
export class List extends LitElement {
  @property({attribute: false})
  myList: string[] = []

  @property({ attribute: false })
  deleteItem!: (item: string) => void

  @property({ attribute: false })
  triggerEdit!: (item: string) => void

  render() {
    const data = this.myList.map((item) => html `
      <div>
        ${item}
        <button @click=${() => this.deleteItem(item)}>Delete</button>
        <button @click=${() => this.triggerEdit(item)}>Edit</button>
      </div>
    `)
    const renderData = html `<div>${data}</div>`

    return renderData
  }
}
