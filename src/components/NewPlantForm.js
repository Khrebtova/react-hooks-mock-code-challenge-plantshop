import React, {useState} from "react";

function NewPlantForm({onHandleAddPlant}) {
  const [newPlant, setNewPlant] = useState({  
      "name": "",
      "image": "",
      "price": "",
  })

  function handleInputChange(e){
    const key = e.target.name;
    const value = e.target.value
    const formData ={...newPlant, [key]: value}
    setNewPlant(formData)    
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log(newPlant)
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(newPlant)
    })
    .then((r)=>r.json())
    .then((plant)=> onHandleAddPlant(plant))   
  }
  
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} type="text" name="name" placeholder="Plant name" />
        <input onChange={handleInputChange} type="text" name="image" placeholder="Image URL" />
        <input onChange={handleInputChange} type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
