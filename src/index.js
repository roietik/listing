import React from "react";
import ReactDOM from "react-dom";
import uuid from "react-uuid";

import "./styles.css";

class Content extends React.Component {
  state = {
    items: [],
    isLoaded: false
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => {
        this.setState({
          items: json,
          isLoaded: true
        });
      });
  }

  handleDelete = id => {
    const url = `{https://jsonplaceholder.typicode.com/users/${id}}`;
    console.log("id", id, "url", url);
    // this.setState(prevState => ({
    //   items: prevState.items.filter(el => el !== id)
    // }));
    fetch(url, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };

  render() {
    const { isLoaded, items } = this.state;
    return (
      <>
        {isLoaded &&
          items.map(item => {
            const {
              id,
              name,
              username,
              email,
              address: { street, city, zipcode },
              phone,
              company: { name: companyName, bs }
            } = item;
            return (
              <div key={uuid()} className="wrapper">
                <div className="title">
                  <h3>{name}</h3>
                  <span>
                    {id}
                    <button>edit</button>
                    <button onClick={() => this.handleDelete(id)}>del</button>
                  </span>
                </div>
                <div className="content">
                  <p>{username}</p>
                  <p>{email}</p>
                  <p>{street}</p>
                  <p>{city}</p>
                  <p>{zipcode}</p>
                  <p>{phone}</p>
                  <p>{companyName}</p>
                  <p>{bs}</p>
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Content />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// api doc
// https://jsonplaceholder.typicode.com/guide.html
