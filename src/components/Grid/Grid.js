import React, { Component } from "react";
//TODO(RBLAND): Update TransitionGroup to latest version.  Will need to use migration guide because it breaks animation.
import TransitionGroup from "react-transition-group/TransitionGroup";
import * as Animated from "animated/lib/targets/react-dom";
import Circle from "components/Circle";
import "./Grid.css";

var AnimatedCircle = Animated.createAnimatedComponent(Circle);

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            circles: [],
            animations: []
        };

        this.removeCircles = this.removeCircles.bind(this);
    }

    componentDidMount() {
        this.renderCircles(this.props.circles);
    }

    removeCircles(gridLocation) {
        this.state.animations.map((anim, index) => {
            if (this.state.circles[index].gridLocation === gridLocation) return;
            return Animated.spring(anim, { toValue: 0, tension: 1 }).start();
        });
    }

    renderCircles(circles) {
        this.setState(
            {
                circles: circles,
                animations: circles.map(() => new Animated.Value(0))
            },
            () => {
                Animated.stagger(
                    150,
                    this.state.animations.map(anim =>
                        Animated.spring(anim, { toValue: 1 })
                    )
                ).start();
            }
        );
    }

    render() {
        const { history } = this.props;
        return (
            <div className="grid-wrapper">
                <TransitionGroup component="div" className="grid">
                    {this.state.circles.map((circle, index) => {
                        return (
                            <AnimatedCircle
                                title={circle.title}
                                color={circle.color}
                                linkTo={circle.linkTo}
                                gridLocation={circle.gridLocation}
                                onSelect={this.removeCircles}
                                history={history}
                                key={index}
                                style={{
                                    transform: [
                                        {
                                            scale: this.state.animations[index]
                                        }
                                    ],
                                    height: "100%",
                                    width: "100%"
                                }}
                            />
                        );
                    })}
                </TransitionGroup>
            </div>
        );
    }
}

export default Grid;
