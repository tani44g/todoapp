import React, {Component} from 'react';
import './Todolist.css'

class TodoList extends Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            completed:[]
        }

        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.SearchItem = this.SearchItem.bind(this);
        this.showComp = this.showComp.bind(this);
        
    }

    showComp(){
        document.getElementById('completed').style.display = 'block'
        document.getElementById('hide/show').innerHTML = "Double-Click Me"
        var x = document.querySelectorAll('li');
        for(var i=0;i<x.length;i++){
            x[i].style.display = 'block'
        }

    }

    addItem(e){
        e.preventDefault();
        var d = new Date();
        if(this.refs.task.value !== ""){
            var newItem = {
                text: this.refs.task.value,
                key: Date.now(),
                time: `${d.getHours()}:${d.getMinutes()}`
            }

            this.setState(() => {

                return this.state.items.push(newItem)

            })
            
        console.log(this.state.items)
        }
        

        this.refs.task.value="";
    }

    delItem(key){
        var index = this.state.items.findIndex(function(comp) {
            return comp.key === key
          })

        var compItem={
            text: this.state.items[index].text,
            key: this.state.items[index].key,
            time: this.state.items[index].time
        }

         var filteredItems = this.state.items.filter(function(item){
            return (item.key !== key)
            
        }) 

        this.setState({

            items: filteredItems,
            return: this.state.completed.push(compItem)
        })

    }

    hideComp(){
        
        document.getElementById(`completed`).style.display='none'
        document.getElementById(`hide/show`).innerHTML = 'Show Completed'
    }

    SearchItem(e){
        e.preventDefault();
        var q = this.refs.task.value
        if(this.refs.task.value !== ""){
            this.state.items.forEach(function(itemp){
                if(!itemp.text.includes(q)){
                    document.getElementById(`${itemp.key}`).style.display='none' 
                }
                else {
                    document.getElementById(`${itemp.key}`).style.display='block'
                }
                
            })
            this.state.completed.forEach(function(itemp){
                if(!itemp.text.includes(q)){
                    document.getElementById(`${itemp.key}`).style.display='none' 
                }
                else {
                    
                    document.getElementById(`completed`).style.display='block'
                    document.getElementById(`${itemp.key}`).style.display='block'
                }
                
            })
            
    
        }
        else{
            
            this.state.items.forEach(function(itemx){
                document.getElementById(`${itemx.key}`).style.display = 'block'
            })
            
            document.getElementById(`completed`).style.display='none'
            this.state.completed.forEach(function(itemx){
                document.getElementById(`${itemx.key}`).style.display = 'none'
            })
        }
        
    }
 


    

    render(){
        
        return(
            <div className='todo row'>
            
                <div className='header col' id="form">
                    <form >
                        <input ref='task' type='text' placeholder='Add Task' required onKeyUp={this.SearchItem} />
                        <button className='btn btn-primary' onClick={this.addItem}>Add</button>
                        <button className='btn btn-danger' id='hide/show' onClick={this.showComp} onDoubleClick={this.hideComp}>Show Completed</button>
                    </form>
                    <div id="list" className='col'>
                        <ul>
                            {this.state.items.map(item => (
                                <li id={item.key} onClick={()=>{this.delItem(item.key)}} key={item.key}>{item.text}   <p>@{item.time}</p></li>
                            )) }
                        </ul>
                    </div> 
                </div>
                
                
                <div id="completed" className='col'>
                    <p id="heading">Completed Tasks</p>
                    <ul>
                        {this.state.completed.map(item => (
                            <li id={item.key} key={item.key}>{item.text}   <p>@{item.time}</p></li>
                        )) }
                    </ul>
                </div>
            </div>
        )
    }
}

export default TodoList;