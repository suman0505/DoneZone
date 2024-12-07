import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './components/Navbar'
import{FaEdit} from "react-icons/fa";
import{AiFillDelete} from "react-icons/ai";

import {v4 as uuidv4} from 'uuid';


function App() {
  const [Todo, setTodo] = useState("")//for input text
 const [Todos, setTodos] = useState([])//holds all the todos
 const [showFinished, setshowFinished] = useState(true)
   
 useEffect(() => {
   
   let todoString = localStorage.getItem("Todos");
   if(todoString){//if not null only then do this
    let todos=JSON.parse(localStorage.getItem("Todos"))
    setTodos(todos);
   }
   
 }, [])
 

 const saveToLocal=() => {
  localStorage.setItem("Todos",JSON.stringify(Todos))
   
 }

 const toggleFinished=() => {
   setshowFinished(!showFinished);
   
 }
 
 

  const handleEdit=(e,id)=>{
    let t= Todos.filter(i=>i.id===id)
    setTodo(t[0].Todo);
    console.log(t[0]);
    let newTodos=Todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newTodos);//deleting that todo from todos so that we can edit it and then add it to the todos array
    saveToLocal();
    
     
    
  }
  const handleDelete=(e,id)=>{
   
  
    let newTodos=Todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newTodos);
    saveToLocal();
   
    



  }
  const handleAdd=()=>{
    setTodos([...Todos,{id:uuidv4(),Todo,isCompleted:false}])
    setTodo("")
    console.log(Todos);
    saveToLocal();
    
           
  }

  const handleChange=(e)=>{
  
    setTodo(e.target.value)
    
    
    
    
  }

  const handleCheckbox = (e) => {
    //getting it's id and marking it as completed
    let id =e.target.name;
    let index= Todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...Todos];//new array
    //newTodos=Todos -> means that it is the same reference and therefore state will not change and no rerendering
    newTodos[index].isCompleted =!newTodos[index].isCompleted;//changing true to false or f to true
    setTodos(newTodos);
    saveToLocal();





    
  }
  

  return (
    <>
      <Navbar/>
      <div className="md:container mx-3   md:mx-auto my-6 rounded-2xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
      <h1 className=' text-center text-4xl text-purple-800 font-extralight'>DoneZone - Boost productivity and Stay Organized</h1>
        <div className="addTodo my-9  gap-3">
         <h2 className='text-2xl font-bold text-purple-950'>New Task</h2>
        <div className="flex">
        <input  onChange={handleChange} value={Todo}   type="text" className='w-full rounded-lg h-12 border-orange-300' />
        <button onClick={handleAdd} disabled={Todo.length<4}   className='bg-violet-300 hover:bg-yellow-100   p-4 py-2 w-1/4 h-12 rounded-full mx-2 font-serif  disabled:bg-gray-300 '>Save</button>
        </div>
         
       </div>
       <input onChange={toggleFinished}  type="checkbox" checked={showFinished} /> 
       <label className='mx-2' htmlFor="show"> Show Finished Todos</label>
       <div className="h-[2px] bg-black opacity-10 w-[90%] my-3 mx-auto"></div>
     
       <h2 className='text-lg font-bold text-blue-600'>Daily Todos</h2>
       <div className="todos">
        {Todos.length===0 && <div>No Todos for now</div>}

        {Todos.map(item =>{

       //showing the todos only if i have clicked show finished or if item is not yet completed
       //
        return  (showFinished || !item.isCompleted) && <div  key = {item.id} className="todo flex  my-3 justify-between">
          <div className='flex gap-4'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={Todo.isCompleted} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.Todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-300 hover:bg-yellow-100 rounded-lg  p-0.5 py-0.5    font-serif mx-1'><FaEdit/></button>
            <button onClick={(e)=>{handleDelete(e,item.id)} }     className='bg-violet-300 hover:bg-yellow-100 rounded-lg  p-0.5 py-0.5  font-serif mx-1'>< AiFillDelete/></button>
          </div>

        </div>
         })}
       </div>
   </div>
    </>
  )
}

export default App
