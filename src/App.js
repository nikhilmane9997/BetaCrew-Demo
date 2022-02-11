import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';
function App() {
  const [data,setData]=useState([])
  const [searchresulrst, setSearchresult] = useState("")
  const [searchShow, setSearchShow] = useState(false)
  const myData = async () => {
    const resp = await fetch("https://api.publicapis.org/entries");
    const data = await resp.json();
    setData(data.entries);
  };
  
  let uniqueData=[]
  
  useEffect(() => {
    myData()
  },[]);

 
  const handleChange = e => {
    setSearchresult(e.target.value)
    if(e.target.value===""){
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };
  const uniques = data.map(item => item.Category)
  .filter((value, index, self) => self.indexOf(value) === index)

 const searchedData=data.map(val=>val.Category).filter((searched)=>{
  return(
      searched.includes(searchresulrst)
    )
  })

const uniquedata=searchedData.filter((items,id)=>{
  return(
    searchedData.indexOf(items)===id
  )
})
  
 

  return (
    <div className="App">
      <input type="text" onChange={handleChange}/>
      {uniques.map((values,id)=>{
        uniqueData.push(values)
        return(
          <div>
   
          <p>{searchShow && <p key={id}>{uniquedata}</p>}
          </p>
          </div>
         
        )
      })}
    </div>
  );
}

export default App;
