import React, { Component } from "react";
import { connect } from "react-redux";
import Animated from "animated/lib/targets/react-dom";
import "./Circle.css";

// Action
//const setCirclePositionAction = { type: "SET_CIRCLE_POSITION" };

const setCirclePositionAction = circleRect => ({
    type: "SET_CIRCLE_POSITION",
    circleRect
});

class Circle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animateX: new Animated.Value(0),
            animateY: new Animated.Value(0),
            animateBorderRadius: new Animated.Value(0),
            animateBackground1: new Animated.Value(0),
            animateBackground2: new Animated.Value(0),
            animateHeight: new Animated.Value(0),
            title: props.title,
            zIndex: 0,
            rect: null
        };

        this.selected = this.selected.bind(this);
        this.refCallback = this.refCallback.bind(this);
    }

    selected() {
        let tempTitle = this.state.title;

        this.setState({ zIndex: 1, title: "" });

        this.props.onSelect(this.props.gridLocation);

        const xTranslate =
            this.props.breadcrumbPositions[0].breadcrumbPosition.left -
            this.state.rect.left;
        const yTranslate =
            this.props.breadcrumbPositions[0].breadcrumbPosition.top -
            this.state.rect.top;

        Animated.parallel([
            Animated.spring(this.state.animateX, {
                toValue: xTranslate,
                tension: 5
            }),
            Animated.spring(this.state.animateY, {
                toValue: yTranslate,
                tension: 5
            }),
            Animated.spring(this.state.animateBorderRadius, {
                toValue: 1,
                tension: 5
            }),
            Animated.spring(this.state.animateHeight, {
                toValue: 1,
                tension: 5
            })
            // Animated.spring(this.state.animateBackground1, {
            //     toValue: 1,
            //     tension: 5
            // }),
            // Animated.spring(this.state.animateBackground2, {
            //     toValue: 1,
            //     tension: 5
            // }),
        ]).start();

        setTimeout(() => this.props.history.push(this.props.linkTo), 1000);
    }

    refCallback(element) {
        if (element) {
            this.setState({
                rect: element.getBoundingClientRect()
            });
        }
    }

    render() {
        const {
            style,
            color,
            gridLocation,
            breadcrumbPositions,
            removeCircles
        } = this.props;
        const {
            title,
            rect,
            animateX,
            animateY,
            animateHeight,
            animateBorderRadius,
            zIndex
        } = this.state;

        let circleHeight = rect ? rect.height : 0;

        return (
            <div className={gridLocation} ref={this.refCallback}>
                <div style={style}>
                    <Animated.div
                        className={`circle ${color}`}
                        style={{
                            transform: [
                                { translateX: animateX },
                                { translateY: animateY }
                            ],
                            borderRadius: animateBorderRadius.interpolate({
                                inputRange: [0, 1],
                                outputRange: [circleHeight / 2, 15]
                            }),
                            height: animateHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [circleHeight, 30]
                            }),
                            // background: this.state.animateBackground1.interpolate({
                            //     inputRange: [0, 1],
                            //     outputRange: [
                            //         "linear-gradient(#fff,#000)",
                            //         "linear-gradient(#000,#fff)"
                            //     ]
                            // }),
                            zIndex: zIndex
                        }}
                        onClick={this.selected}
                    >
                        {title}
                    </Animated.div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    breadcrumbPositions: state.breadcrumbPositions
});

Circle = connect(mapStateToProps)(Circle);

export default Circle;
