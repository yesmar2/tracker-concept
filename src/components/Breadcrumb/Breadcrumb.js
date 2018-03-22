import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

class Breadcrumb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: null
        };

        this.refCallback = this.refCallback.bind(this);
    }

    refCallback(element) {
        if (element) {
            this.props.dispatch(
                setBreadcrumbPositionAction(element.getBoundingClientRect())
            );
        }
    }

    render() {
        const { title, linkTo } = this.props;
        return (
            <div ref={this.refCallback}>
                <Link to={linkTo} className="breadcrumb">
                    {title}
                </Link>
            </div>
        );
    }
}

const setBreadcrumbPositionAction = breadcrumbPosition => ({
    type: "SET_BREADCRUMB_POSITION",
    breadcrumbPosition
});

Breadcrumb = connect()(Breadcrumb);

export default Breadcrumb;
