import axios from 'axios';
import { useState, useEffect } from 'react';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  car: string;
  purchasedate: string;
}

interface RandomUserData {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [car, setCar] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get('https://randomuser.me/api/')
      .then(response => {
        const userData: RandomUserData = response.data.results[0];
        setFirstName(userData.name.first);
        setLastName(userData.name.last);
        setEmail(userData.email);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      car: car,
      purchasedate: purchaseDate,
    };

    axios.post('https://acc-test-vjn7.onrender.com/form', formData, {
      headers: {
        'content-type': 'application/json',
        'x-api-key': 'letmein',
      },
    })
      .then(response => {
        if (response.status === 200) {
          setSuccess(true);
          console.log(response)
        }
      })
      .catch(error => {
        console.error(error);
        alert("Please fill missing fields!")
      });
  };

  return (
    <div className="container mt-5">
      <h1>FORM</h1>
      <div>
        {success ? (
          <div>Success!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-3">
                <div className="form-group" style={{ paddingTop: "10px" }}>
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <div className="form-group">
                  <label htmlFor="car">Car:</label>
                  <select className="form-control" id="car" value={car} onChange={event => setCar(event.target.value)} required>
                    <option value="Choose">Choose</option>
                    <option value="Golf">Golf</option>
                    <option value="Arteon">Arteon</option>
                    <option value="Tiguan">Tiguan</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <div className="form-group">
                  <label htmlFor="purchaseDate">Purchase Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="purchaseDate"
                    value={purchaseDate}
                    min="2018-01-01"
                    onChange={event => setPurchaseDate(event.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Form;