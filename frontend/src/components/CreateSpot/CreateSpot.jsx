import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './CreateSpot.css';
import { useNavigate } from 'react-router-dom'
import { createSpot } from '../../store/spots';

function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [spotImages, setSpotImages] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

        const newSpot = dispatch(
        createSpot({
         country,
         address,
         city,
         state,
         lat,
         lng,
         description,
         name,
         price,
         previewImage,
         spotImages
        })
      );
      if(newSpot.errors){
        setErrors(newSpot.errors);
      }else if( newSpot && newSpot.id){
        navigate(`/spots/${newSpot.id}`)
      }
    };

    return (
        <>
        <h1 id='createspotitle'>Create A Spot</h1>
        <form onSubmit={handleSubmit}>
          <label className='inputs'>
          
            <input
              type="text"
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          {errors.address && <p className='errormesg'>{errors.address}</p>}
          <label className='inputs'>
          
            <input
              type="text"
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          {errors.country && <p className='errormesg'>{errors.country}</p>}
          <label className='inputs'>
            
            <input
              type="text"
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          {errors.city && <p className='errormesg'>{errors.city}</p>}
          <label className='inputs'>
            
            <input
              type="text"
              placeholder='State'
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          {errors.state && <p className='errormesg'>{errors.state}</p>}
          <label className='inputs'>
            
            <input
              type="number"
              placeholder='Lat'
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </label>
          {errors.lat && <p className='errormesg'>{errors.lat}</p>}
          <label className='inputs'>
            
            <input
              type="number"
              placeholder='Lng'
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </label>
          {errors.lng && <p className='errormesg'>{errors.lng}</p>}
          <label className='inputs'>
            
            <input
              type="text"
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors.description && <p className='errormesg'>{errors.description}</p>}
          <label className='inputs'>
            
            <input
              type="text"
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          {errors.name && <p className='errormesg'>{errors.name}</p>}
          <label className='inputs'>
            <input
              type="number"
              placeholder='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          {errors.previewImage && <p className='errormesg'>{errors.previewImage}</p>}
          <label className='inputs'>
            <input
              type="text"
              placeholder='PreviewImage'
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
          </label>
          {errors.spotImages && <p className='errormesg'>{errors.spotImages}</p>}
          <label className='inputs'>
            <input
              type="text"
              placeholder='SpotImage'
              value={spotImages}
              onChange={(e) => setSpotImages(e.target.value)}
              required
            />
          </label>
          {errors.spotImages && <p className='errormesg'>{errors.spotImages}</p>}


          <button  id='submitbutton' type="submit">Creat Spot</button>
        </form>
      </>
    );

}

export default CreateSpot;