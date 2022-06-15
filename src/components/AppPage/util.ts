export const getData = (data: any) => {
  let children: any[] = [];
  let navigation: any[] = [];
  let nestedNavigation: any[] = [];
  let actions: any[] = [];
  let content: any[] = [];

  if (Array.isArray(children)) {
    children.map((item) => {
      switch (item.props.type) {
        case 'Actions':
          actions = [...actions, item.props.children];
          break;
        case 'Navigation':
          navigation = [...navigation, item.props.children];
          break;
        case 'NestedNavigation':
          nestedNavigation = [...nestedNavigation, data.props.children];
          break;
        case 'Content':
          navigation = [...content, item.props.children];
          break;
        default:
          break;
      }
    });
  } else {
    switch (data.props.type) {
      case 'Actions':
        actions = [...actions, data.props.children];
        break;
      case 'Navigation':
        navigation = [...navigation, data.props.children];
        break;
      case 'NestedNavigation':
        nestedNavigation = [...nestedNavigation, data.props.children];
        break;
      case 'Content':
        navigation = [...content, data.props.children];
        break;
      default:
        break;
    }
  }

  return { navigation, nestedNavigation, actions, content };
};
