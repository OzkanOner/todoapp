import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { TodoItem } from '../todoitem';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  displayAll:boolean = false;
  inputText: string = "";

  constructor() { 
    this.model.items = this.getItemsFromLS();
  }

  model = new Model();

  completedCount(){
    return this.model.items.filter(item => item.action).length;
  }

  notCompletedCount(){
    return this.model.items.filter(item => !item.action).length;
  }

  getName(){
    return this.model.name;
  }

  getItems(){
    if(this.displayAll){
      return this.model.items;
    }
    return this.model.items.filter(item => !item.action);
  }

  addItem(){
    if(this.inputText!=""){
      let data = { id: uuidv4(), description: this.inputText, action: false };
      this.model.items.push(data);

      let items = this.getItemsFromLS();
      items.push(data);
      localStorage.setItem("items", JSON.stringify(items));

      this.inputText = "";
    }else{
      alert("Enter information!");
    }
  }

  getItemsFromLS(){
    let items:TodoItem[] = [];

    let value = localStorage.getItem("items");

    if(value != null){
      items = JSON.parse(value);
    }

    return items;
  }

  getBtnClasses(){
    return {
      'disabled': this.inputText.length == 0,
      'btn-secondary': this.inputText.length == 0,
      'btn-primary': this.inputText.length > 0
    }
  }

  onActionChanged(item:TodoItem){
    let items = this.getItemsFromLS();
    
    localStorage.clear();

    items.forEach(i => {
      if(i.id == item.id){
        i.action = item.action;
      }
    });

    localStorage.setItem("items", JSON.stringify(items));
  }
}