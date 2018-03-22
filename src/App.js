import React from "react";
import { Route } from "react-router-dom";
import Grid from "components/Grid";
import Breadcrumb from "components/Breadcrumb";

import "./App.css";

const App = () => {
    const circles = [
        {
            id: 1,
            title: "To Do",
            gridLocation: "top-left",
            color: "red",
            linkTo: "/1"
        },
        {
            id: 2,
            title: "Search",
            gridLocation: "top-middle",
            color: "green",
            linkTo: "/1"
        },
        {
            id: 3,
            title: "Categories",
            gridLocation: "middle",
            color: "blue",
            linkTo: "/1"
        },
        {
            id: 4,
            title: "Holder",
            gridLocation: "bottom-middle",
            color: "purple",
            linkTo: "/1"
        },
        {
            id: 5,
            title: "Settings",
            gridLocation: "bottom-right",
            color: "orange",
            linkTo: "/1"
        }
    ];

    const circles2 = [
        {
            id: 6,
            title: "Food",
            gridLocation: "top-left",
            color: "red",
            linkTo: "/"
        },
        {
            id: 7,
            title: "Shopping",
            gridLocation: "top-middle",
            color: "purple",
            linkTo: "/"
        },
        {
            id: 8,
            title: "Chores",
            gridLocation: "middle",
            color: "green",
            linkTo: "/"
        },
        {
            id: 9,
            title: "Work",
            gridLocation: "bottom-middle",
            color: "blue",
            linkTo: "/"
        },
        {
            id: 10,
            title: "Movies",
            gridLocation: "bottom-right",
            color: "yellow",
            linkTo: "/"
        }
    ];

    const breadcrumbs = [
        {
            title: "Categories",
            linkTo: "/"
        }
    ];

    return (
        <div className="app">
            <div className="breadcrumb-container">
                <Route
                    exact
                    path="/:circleId"
                    render={props => {
                        console.log(props);
                        const selectedCircle = circles.filter(
                            circle => (circle.id = props.match.params.circleId)
                        );
                        return (
                            <Breadcrumb
                                title={selectedCircle[0].title}
                                linkTo="/"
                            />
                        );
                    }}
                />

                <div style={{ opacity: 0 }}>
                    <Breadcrumb title="Looking at my source?" linkTo="/" />
                </div>
            </div>
            <Route
                exact
                path="/"
                render={props => (
                    <Grid circles={circles} history={props.history} />
                )}
            />
            <Route
                exact
                path="/1"
                render={props => (
                    <Grid circles={circles2} history={props.history} />
                )}
            />
        </div>
    );
};

export default App;
