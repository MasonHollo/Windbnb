import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSpotThunk } from '../../store/spots';
import './UpdateSpot.css'

function UpdateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots.byId[id]);
  const [country, setCountry] = useState(spot.country || "");
  const [address, setAddress] = useState(spot.address || "");
  const [city, setCity] = useState(spot.city || "");
  const [state, setState] = useState(spot.state || "");
  const [lat, setLat] = useState(spot.lat || "");
  const [lng, setLng] = useState(spot.lng || "");
  const [description, setDescription] = useState(spot.description || "");
  const [name, setName] = useState(spot.name || "");
  const [price, setPrice] = useState(spot.price || "");
  const [previewImage, setPreviewImage] = useState(spot.previewImage || "");
  const [spotImages, setSpotImages] = useState(spot.spotImages || ["", "", "", "", ""]);
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
      <div className='updatespot'>

        <button id='demospots' type='button' onClick={handleDemoSpot}>Demo Data</button>
        <h1 id='updatespotitle'>Update A Spot</h1>
        <form onSubmit={handleSubmit}>
          <div id='sectionone'>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>



            <div id='test'>
              <p>Country</p>
              {errors.country && <p className='errormesg'>{errors.country}</p>}
            </div>
            <label className='inputs'>
              <input id='country'
                type="text"
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}

              />
            </label>
            <div id='test'>
              <p>Street Address</p>
              {errors.address && <p className='errormesg'>{errors.address}</p>}
            </div>
            <label className='inputs'>
              <input id='address'
                type="text"
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}

              />
            </label>
            <div id='citystate'>
              <div>
                <div id='test'>
                  <p>City</p>
                  {errors.city && <p className='errormesg'>{errors.city}</p>}
                </div>
                <label className='inputs'>
                  <input id='city'
                    type="text"
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}

                  /> ,
                </label>
              </div>

              <div>
                <div id='test'>
                  <p>State</p>
                  {errors.state && <p className='errormesg'>{errors.state}</p>}
                </div>
                <label className='inputs'>
                  <input id='state'
                    type="text"
                    placeholder='State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}

                  />
                </label>
              </div>
            </div>
            <div id='latlng'>
              <div>
                <div id='test'>
                  <p>Latitude</p>
                  {errors.lat && <p className='errormesg'>{errors.lat}</p>}
                </div>
                <label className='inputs'>
                  <input id='lat'
                    type="number"
                    placeholder='Latitude'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}

                  />,
                </label>
              </div>

              <div>
                <div id='test'>
                  <p>Longitude</p>
                  {errors.lng && <p className='errormesg'>{errors.lng}</p>}
                </div>
                <label className='inputs'>
                  <input id='lng'
                    type="number"
                    placeholder='Longitude'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}

                  />
                </label>
              </div>
            </div>
          </div>

          <div id='sectiontwo'>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

            <label className='inputs'>
              <input
                id='description'
                type="text"
                placeholder='Please write at least 30 characters'
                value={description}
                onChange={(e) => setDescription(e.target.value)}

              />
            </label>
            {errors.description && <p className='errormesg'>{errors.description}</p>}
          </div>

          <div id='sectionthree'>
            <h2>Create a title for your spot</h2>
            <p> Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>

            <label className='inputs'>
              <input id='spotname'
                type="text"
                placeholder='Name of your spot'
                value={name}
                onChange={(e) => setName(e.target.value)}

              />
            </label>
            {errors.name && <p className='errormesg'>{errors.name}</p>}
          </div>

          <div id='sectionfour'>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

            <label className='inputs'>
              <p id='dollarsign'>$</p>
              <input id='cost'
                type="number"
                placeholder='Price per night (USD)'
                value={price}
                onChange={(e) => setPrice(e.target.value)}

              />
            </label>
            {errors.previewImage && <p className='errormesg'>{errors.previewImage}</p>}
          </div>

          <div id='sectionfive'>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot.</p>


            <label className='inputs'>

              <input id='previmage'
                type="text"
                placeholder='Preview Image URL'
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}

              />
            </label>
            {spotImages.map((image, index) => (
              <label key={index} className='inputs'>
                <input id='imgs'
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
          </div>
          <button id="createspotbutton" type="submit">Create Spot</button>
        </form>
      </div>
    </>
  );
}

export default UpdateSpot;
