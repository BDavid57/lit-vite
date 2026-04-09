import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import './components/list'

@customElement("my-main_app")
export class MyTimer extends LitElement {
  @state() private myList = ['test1', 'test2', 'test3']
  @state() private item = ""
  @state() private triggerEdit = false
  @state() private itemEdit = ""
  @state() private indexOfItem: number | null = null

  render() {
    return html`
      <div>
        <div style="height: 100px">
          <input .value=${this.item} @input=${this.handleItemInput} />
          <button @click=${this.addItemToList}>Add</button>

          ${this.triggerEdit
            ? html`
                <div>
                  <input .value=${this.itemEdit} @input=${this.handleEditInput} />
                  <button @click=${this.handleEditSave}>Save</button>
                </div>
              `
            : null}
        </div>

        <my-list
          .myList=${this.myList}
          .deleteItem=${this.handleDeleteItem}
          .triggerEdit=${this.handleTriggerEdit}
        ></my-list>
      </div>
    `;
  }

  handleItemInput = (event: Event) => {
    this.item = (event.target as HTMLInputElement).value
  }

  handleDeleteItem = (item: string) => {
    this.myList = this.myList.filter(i => i !== item)
  }

  handleTriggerEdit = (item: string) => {
    this.triggerEdit = true
    this.itemEdit = item
    this.indexOfItem = this.myList.indexOf(item)
  }

  handleEditInput = (event: Event) => {
    this.itemEdit = (event.target as HTMLInputElement).value
  }

  handleEditSave = () => {
    this.myList = this.myList.map((el, index) => {
      if(index === this.indexOfItem) {
        el = this.itemEdit
      }

      return el
    })
    this.itemEdit = ""
    this.triggerEdit = false
  }

  addItemToList = () => {
    this.myList = [...this.myList, this.item]
    this.item = ''
  }
}
