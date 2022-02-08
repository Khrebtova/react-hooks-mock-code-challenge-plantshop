import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onHandleDelete, onPlantUpdate}) {
  const listOfPlants = plants.map((plant)=> <PlantCard key={plant.id} plant={plant} onHandleDelete={onHandleDelete} onPlantUpdate={onPlantUpdate}/>)

  return (
    <ul className="cards">{listOfPlants}</ul>
  );
}

export default PlantList;
