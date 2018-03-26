# Tracker Concept

This is just the beginning stages of a web application concept I've had in my head for a couple of years. At this point it just highlights some animations and the general flow of the application.

## [Demo](https://tracker-concept.firebaseapp.com/)

### Animations

*   During page load each circle appears one by one using a spring animation. I ended up using the Animated library instead of straight css due to it's ease of use performing multiple animations. It allowed me to easily stagger each circle so that they didn't all load at the same time.
*   When a circle is clicked it transitions into the breadcrumb section. This took a little more work since I had to determine the location of the breadcrumb in order calculate where to translate the circle. Due to the way react only handles local state I had to add redux to this application to store the breadcrumb location globally and access it within the circle component.
    *   Other tools used to accomplish animation:
        *   React refs - used to get location of circle and breadcrumbs and store them in the redux store.
        *   Animated library - used to easily manage multiple animations in parallel.
*   When a circle is clicked all of the other circles disappear during it's transition. This was accomplished by passing a callback function from the grid component to the circle to call when a circle is clicked.
