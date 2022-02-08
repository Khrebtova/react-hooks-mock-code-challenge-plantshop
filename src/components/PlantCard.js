import React, {useState} from "react";

function PlantCard({plant, onHandleDelete, onPlantUpdate}) {
  const [isInStock, setIsInStock] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [newPrice, setNewPrice] = useState('')

  function handlePrice(e){
    setNewPrice(e.target.value)
  }

  function handleClick(){
    setIsInStock(!isInStock)
  }

  function handleDelete(){
    console.log("delete ", plant.name)
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method:"DELETE"
    })
    .then( r => r.json())
    .then(() => onHandleDelete(plant.id))
  }

 
  function handleSubmit(e){
    e.preventDefault()
    console.log("new price: ",plant.name,  newPrice)
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method:"PATCH",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({"price": newPrice})
    })
    .then( (r) => r.json())
    .then((data) => {
      setIsEditing(!isEditing)
      onPlantUpdate(data)
    })
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {!isEditing ? null : <form onSubmit = {(e)=> handleSubmit(e)}>
                 <input type='number' step="0.01" placeholder="type new price" name="price" onChange={handlePrice}></input>
                 <button type="submit">✔️</button> 
                 </form> }
      <p>Price: <span>{plant.price} <button onClick={() => setIsEditing(!isEditing)}> ✏️ </button></span> </p>
      {isInStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDelete} > Delete </button>
      
    </li>
  );
}

export default PlantCard;
