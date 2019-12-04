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
    fetch("http://localhost:3000/posts")
      .then(response => response.json())
      .then(json => {
        this.setState({
          items: json,
          isLoaded: true
        });
      });
  }

  handleDelete = id => {
    const url = `http://localhost:3000/posts/${id}`;
    fetch(url, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(json => {
        console.log("del", json);
        this.setState(prevState => ({
          items: prevState.items.filter(el => el.id !== id)
        }));
      });
  };

  handleEdit = id => {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const getId = id;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        userId: getId,
        id: getId,
        title: "title",
        body: "body"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        const { items: here } = this.state;
        const updatedItem = json;
        here.splice(id - 1, 1, updatedItem);
        this.setState({ items: here });

      });
  };
  handleAdd = () => {
    console.log('added')
  }

  render() {
    const { isLoaded, items } = this.state;
    return (
      <>
        {isLoaded &&
          items.map(item => {
            const { id, title, body } = item;
            return (
              <div key={uuid()} className="wrapper">
                <div className="title">
                  <h3>{title}</h3>
                  <span>
                    {id}
                    <button onClick={() => this.handleEdit(id)}>edit</button>
                    <button onClick={() => this.handleDelete(id)}>del</button>
                  </span>
                </div>
                <div className="content">
                  <p>{body}</p>
                  <p>{body}</p>
                </div>
              </div>
            );
          })
          }
          <button className="addBtn" onClick={this.handleAdd}>add</button>
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

// api npm -g json-server