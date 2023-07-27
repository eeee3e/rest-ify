import React from 'react';
import AddRestaurant from '../../Components/Restaurants/Add/AddRestaurant';


function Create() {

  console.log(localStorage.getItem('access_token'))
  return (
    <>
      <AddRestaurant />
    </>
  );
}

export default Create;