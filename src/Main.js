import React, { Component } from "react";
import Repo from "./components/Repo";
import Moment from "moment";
import "./Main.scss";

export default class Main extends Component {
  state = {
    items: [],
    page: 1,
    perPage: 5,
    isLoading: true,
    error: ""
  };

  componentDidMount() {
    this.loadRepos();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  handleScroll = e => {
    const bottom =
      e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight;
    if (bottom) {
      this.loadMore()
    }
  };

  daysAgo = (days) => {
    return Moment().subtract(days, "days").format("YYYY-MM-DD");
  }

  // Load data from Github API
  loadRepos = () => {
    const { page, items, perPage} = this.state;
    const backDate = this.daysAgo(30);

    // Pass page number and number per page to API
    const API = `https://api.github.com/search/repositories?q=created:>${backDate}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;

    fetch(API)
      .then(response => response.json())
      .then(data => {
        // Set data in json response to state
        this.setState({
          items: [...items, ...data.items],
          isLoading: false,
        });
      })
      // Handle errors
      .catch(error =>
        this.setState({
          error: error,
          isLoading: true
        })
      );
  };

  // Increase page count and add more items to states  
  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    })
    this.loadRepos();
  }

  // Loop over all items in state and render with Repo component
  render() {
    return (
      <main className="main-container">
        <div className={this.state.error ? 'show error' : 'error' }>{!this.state.error ? null: <span>There was an error while trying to load app data</span>}</div>
        <div>
          {!this.state.isLoading ? (
            this.state.items.map(item => {
              return (
                <Repo
                  key={item.node_id}
                  description={item.description}
                  avatar={item.owner.avatar_url}
                  name={item.name}
                  issues={item.open_issues_count}
                  stars={item.stargazers_count}
                  owner={item.owner.login}
                  updateDate={item.updated_at}
                />
              );
            })
          ) : (
            // If there is a delay in data, let's let the user know it's loading
            <h3 className={this.state.error ? 'hide' : null }>Loading...</h3>
          )}
        </div>
      </main>
    );
  }
}
