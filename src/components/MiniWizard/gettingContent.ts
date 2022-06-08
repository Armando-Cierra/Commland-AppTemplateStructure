let steps: any[] = [];
let stepsActions: any[] = [];
let stepsContent: any[] = [];
let stepsReview: any[] = [];

//This function gets the different arrays of contents based on the children components passed in the structure
const gettingContent = (content: any) => {
  steps = [];
  stepsActions = [];
  stepsContent = [];
  stepsReview = [];

  //Loop to get each Step and its content
  if (Array.isArray(content)) {
    const newContent = [...content];
    //Loop to get each section inside a step and its position
    newContent.forEach((step: any) => {
      const sections = step.props.children;
      steps = [...steps, step];

      if (Array.isArray(sections)) {
        let availableElements: any[] = [];

        sections.forEach((item) => {
          const section = item.props;

          switch (section.type) {
            case 'Actions':
              stepsActions = [...stepsActions, section];
              availableElements = [...availableElements, 'Actions'];
              break;
            case 'Content':
              stepsContent = [...stepsContent, section];
              availableElements = [...availableElements, 'Content'];
              break;
            case 'Review':
              stepsReview = [...stepsReview, section];
              availableElements = [...availableElements, 'Review'];
              break;
          }
        });

        if (availableElements.indexOf('Actions') === -1)
          stepsActions = [...stepsActions, false];

        if (availableElements.indexOf('Content') === -1)
          stepsContent = [...stepsActions, false];

        if (availableElements.indexOf('Review') === -1)
          stepsReview = [...stepsActions, false];
      } else {
        let availableElement: any[] = [];
        const section = sections.props;

        switch (section.type) {
          case 'Actions':
            stepsActions = [...stepsActions, section];
            availableElement = [...availableElement, 'Actions'];
            break;
          case 'Content':
            stepsContent = [...stepsContent, section];
            availableElement = [...availableElement, 'Content'];
            break;
          case 'Review':
            stepsReview = [...stepsReview, section];
            availableElement = [...availableElement, 'Review'];
            break;
        }

        if (availableElement.indexOf('Actions') === -1)
          stepsActions = [...stepsActions, false];

        if (availableElement.indexOf('Content') === -1)
          stepsContent = [...stepsActions, false];

        if (availableElement.indexOf('Review') === -1)
          stepsReview = [...stepsActions, false];
      }
    });
  } else {
    steps = [...steps, content];
  }

  return { steps, stepsActions, stepsContent, stepsReview };
};

export default gettingContent;
