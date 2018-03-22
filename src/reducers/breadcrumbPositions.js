const breadcrumbPositions = (state = [], action) => {
    switch (action.type) {
        case "SET_BREADCRUMB_POSITION":
            console.log(action.breadcrumbPosition);
            return [
                ...state,
                {
                    breadcrumbPosition: action.breadcrumbPosition
                }
            ];
        default:
            return state;
    }
};

export default breadcrumbPositions;
