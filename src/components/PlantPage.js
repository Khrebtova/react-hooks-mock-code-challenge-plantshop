import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [plantsToDisplay, setPlantsToDisplay] = useState([])

  useEffect(()=>{
    fetch("http://localhost:6001/plants")
    .then((r)=> r.json())
    .then((data) => {
      setPlants(data)
      setPlantsToDisplay(data)})
  }, [])

  function addPlant(newPlant){
     const updatedPlantList = [...plantsToDisplay, newPlant] 
     setPlantsToDisplay(updatedPlantList)
  }

  function handleSearch(search){    
    const lowerCaseSearch = search.toLowerCase()
    if(search){
      const filteredList = plants.filter((plant)=> plant.name.toLowerCase().includes(lowerCaseSearch))
      setPlantsToDisplay(filteredList)
    }else{
      setPlantsToDisplay(plants)
    }
  }

  function handleDelete(id){
    console.log("delete id" , id)
    const updatedPlantList= plantsToDisplay.filter((plant)=> plant.id !== id)
    setPlantsToDisplay(updatedPlantList)
  }

  function plantUpdate(updatedPlant){
    const updatedPlantList = plantsToDisplay.map((plant)=>{
      if(plant.id === updatedPlant.id){
        return updatedPlant
      }else{
        return plant
      }
    })
    setPlantsToDisplay(updatedPlantList)
  }

  return (
    <main>
      <NewPlantForm onHandleAddPlant={addPlant}/>
      <Search onHandleSearch={handleSearch} />
      <PlantList plants={plantsToDisplay} onHandleDelete={handleDelete} onPlantUpdate={plantUpdate}/>
    </main>
  );
}

export default PlantPage;
