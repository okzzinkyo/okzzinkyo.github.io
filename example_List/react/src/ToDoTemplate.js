class ToDoTitle extends React.Component {
  render() {
    return (
      <h2 className="ToDoTitle">TODO LIST</h2>
    );
  }
}


var listArr = {}
const list = document.querySelector(".ToDoItem")
class ToDoInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {value:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value});
  }
  
  handleSubmit(event){
    const data = {
      value: value,
      checked : false
    };
    listArr.push(data);
    localStorage.setItem(this.state.value);
    event.preventDefault();
  }

  render() {
    console.log("This should be printed in console!");
    return(
      <form className="ToDoInput" onSubmit={ths.handleSubmit}>
          <input className="ToDoText" type="text" value={this.state.value} onChange={this.handleChange} placeholder="what do you have to do?"></input>
          <button className="btn_add" type="submit">ADD</button>
      </form>
    );
  }
}
  
for(i=0; i<localStorage.length; i++){
    new Array(localStorage.length).fill().map(i=>localStorage.key(i));
}

class ToDoItem extends React.Component{
  constructor(props){
    super(props);
    
    
  }

 render() {
    return(
        <li className="ToDoItem">
          <button type="button" className="checkbox"></button>
          <p className="ToDoValue"></p>
          <button className="btn_delete" type="button"><i class="fas fa-eraser"></i></button>
        </li>
    );
  }
}

class ToDoItemList extends React.Component{
  render() {
    return(
      <ul className="ToDoItemList">
        
      </ul>
    );
  }
}

class ToDoTemplate extends React.Component{
  render(){
    return(
      <div className="ToDoTemplate">
        <ToDoTitle></ToDoTitle>
        <ToDoInput></ToDoInput>
        <ToDoItemList>
          <ToDoItem></ToDoItem>
        </ToDoItemList>
      </div>
    );
  }
}


let domContainer = document.querySelector('#wrap');
ReactDOM.render(<ToDoTemplate/>, domContainer);