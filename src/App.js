import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const baseUrl = "http://localhost:5000/";
function App() {
  const [data, setData] = useState({
    name: "",
  });
  const [myArray, setmyArray] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get(`${baseUrl}`)
      .then((response) => {
        console.log(response);
        setmyArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setData({ ...data, [name]: value });
  };
  let { name } = data;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name.trim() !== "") {
      setmyArray([...myArray, { name }]);
      const data = {
        name: name,
      };
      axios.post(`${baseUrl}`, data).then((resp) => {
        console.log(resp);
        fetchData();
      });
      setData({
        name: "",
      });
    }
  };
  console.log(myArray);
const deleteFunc=(id)=>{
  console.log("deleted id",id)
  axios.delete(`${baseUrl}`+id).then((resp) => {
    console.log(resp);
    fetchData();
  });
}
  return (
    <div className="form">
      <div className="form-input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <button>Add</button>
        </form>
      </div>
      <div className="form-list">
        <ul>
          {myArray &&
            myArray.map((el, index) => <><li key={index}>{el.name} <button ><i class="material-icons">edit</i></button><button onClick={()=>deleteFunc(el.id)}><i class="material-icons" >delete</i></button></li></>)}
            {myArray.length===0 && <li>No List Found</li>}
        </ul>
      </div>
    </div>
  );
}

export default App;
