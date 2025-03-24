import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSpotThunk } from '../../store/spots';

function UpdateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)

  const spot = useSelector((state) => state.spots.byId[id]);
  console.log(spot)

  const [country, setCountry] = useState(spot?.country || "");
  const [address, setAddress] = useState(spot?.address || "");
  const [city, setCity] = useState(spot?.city || "");
  const [state, setState] = useState(spot?.state || "");
  const [lat, setLat] = useState(spot?.lat || "");
  const [lng, setLng] = useState(spot?.lng || "");
  const [description, setDescription] = useState(spot?.description || "");
  const [name, setName] = useState(spot?.name || "");
  const [price, setPrice] = useState(spot?.price || "");
  const [previewImage, setPreviewImage] = useState(spot?.previewImage || "");
  const [spotImages, setSpotImages] = useState(spot?.spotImages || ["", "", "", "", ""]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setLat(spot.lat);
      setLng(spot.lng);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
      setPreviewImage(spot.previewImage);
      setSpotImages(spot.spotImages || ["", "", "", "", ""]);
    }
  }, [spot]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const imageUrls = [previewImage, ...spotImages.filter((img) => img.trim() !== "")];

    return dispatch(
      updateSpotThunk(id,
        { country, address, city, state, lat, lng, description, name, price },
        imageUrls
      )
    )
      .then((updateSpot) => {
        if (updateSpot?.id) {
          navigate(`/spots/${spot.id}`);
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoSpot = () => {
    setCountry("United States of America");
    setAddress("24 Willie Mays Plaza");
    setCity("San Francisco");
    setState("Califorina");
    setLat("37.7783");
    setLng("-122.3895");
    setDescription("Home of the San Fransico Giants baseball orginzation!");
    setName("Demo Spot");
    setPrice("2025");
    setPreviewImage("https://img.mlbstatic.com/mlb-images/image/private/t_w1024/mlb/c8rnlo4gwd0noskqhc8i.jpg");
    setSpotImages([
      "https://example.com/spot1.jpg",
      "https://example.com/spot2.jpg",
      "https://example.com/spot3.jpg",
      "https://example.com/spot4.jpg",
      "https://example.com/spot5.jpg"
    ]);
  };

  return (
    <>
      <button type='button' onClick={handleDemoSpot}>Demo Data</button>
      <h1 id='createspotitle'>Update your Spot</h1>
      <form onSubmit={handleSubmit}>
        <div id='sectionone'>
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>

          <label className='inputs'>
            <input
              type="text"
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}

            />
          </label>
          {errors.country && <p className='errormesg'>{errors.country}</p>}
          <label className='inputs'>
            <input
              type="text"
              placeholder='Street Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {errors.address && <p className='errormesg'>{errors.address}</p>}
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
              placeholder='Latitude'
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </label>
          {errors.lat && <p className='errormesg'>{errors.lat}</p>}
          <label className='inputs'>
            <input
              type="number"
              placeholder='Longitude'
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </label>
          {errors.lng && <p className='errormesg'>{errors.lng}</p>}
        </div>

        <div id='sectiontwo'>
          <h2>Describe your place to guests</h2>
          <label className='inputs'>
            <input
              type="text"
              placeholder='Please write at least 30 characters'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors.description && <p className='errormesg'>{errors.description}</p>}
        </div>

        <div id='sectionthree'>
          <h2>Create a title for your spot</h2>
          <label className='inputs'>
            <input
              type="text"
              placeholder='Name of your spot'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          {errors.name && <p className='errormesg'>{errors.name}</p>}
        </div>

        <div id='sectionfour'>
          <h2>Set a base price for your spot</h2>
          <label className='inputs'>
            <input
              type="number"
              placeholder='Price per night (USD)'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          {errors.previewImage && <p className='errormesg'>{errors.previewImage}</p>}
        </div>

        <div id='sectionfive'>
          <h2>Liven up your spot with photos</h2>
          <label className='inputs'>
            <input
              type="text"
              placeholder='Preview Image URL'
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}

            />
          </label>
          {spotImages.map((image, index) => (
            <label key={index} className='inputs'>
              <input
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={image}
                onChange={(e) => {
                  const updatedImages = [...spotImages];
                  updatedImages[index] = e.target.value;
                  setSpotImages(updatedImages);
                }}
              />
            </label>
          ))}
          {errors.spotImages && <p className='errormesg'>{errors.spotImages}</p>}
          <button id="submitbutton" type="submit">Update Spot</button>
        </div>
      </form>
    </>
  );
}

export default UpdateSpot;
