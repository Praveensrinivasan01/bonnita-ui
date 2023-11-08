import React, { useState } from 'react'


const Profile = () => {
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
  // const [mobile, setMobile] = useState('');
  // const [address, setAddress] = useState('');
  // const [no, setNo] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [zipcode, setZipcode] = useState('');
  // const [country, setCountry] = useState('');

  const [data, setData] = useState({
      firstname:'',
      lastname:'',
      mobile:'',
      address:'',
      no:'',
      city:'',
      state:'',
      zipcode:'',
      country:''
  })
  // const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(process.env.REACT_APP_API_URL);
    try {
      console.log('test');
    } 
    catch (error) {

    }
  }



  return (
    <div>
         <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="Text" name='firstname' value={data.firstname} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="Text" name='lastname' value={data.lastname} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="Text" name='mobile' value={data.mobile} onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <input type="Text" name='address' value={data.address} onChange={handleChange}/>
        </div>
        <div>
          <label>No.</label>
          <input type="Text" name='no' value={data.no} onChange={handleChange} />
        </div>
        <div>
          <label>City</label>
          <input type="Text" name='city' value={data.city} onChange={handleChange} />
        </div>
        <div>
          <label>State</label>
          <input type="Text" name='state' value={data.state} onChange={handleChange} />
        </div>
        <div>
          <label>Zipcode</label>
          <input type="Text" name='zipcode' value={data.zipcode} onChange={handleChange} />
        </div>
        <div>
          <label>Country</label>
          <input type="Text" name='country' value={data.country} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Profile