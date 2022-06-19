const initialState = {
  ChainSaws: [
    {
      fieldType: "text",
      fieldText: "Model",
      key: "model",
    },
    {
      fieldType: "text",
      fieldText: "Type",
      key: "type",
    },
    {
      fieldType: "text",
      fieldText: "Grade",
      key: "grade",
    },
    {
      fieldType: "number",
      fieldText: "Bar Length",
      key: "barLength",
    },
    {
      fieldType: "text",
      fieldText: "Brand",
      key: "brand",
    },
    {
      fieldType: "date",
      fieldText: "Build Date",
      key: "buildDate",
    },
    {
      fieldType: "number",
      fieldText: "Quantity",
      key: "quantity",
    },
  ],
  Bulldozers: [
    {
      fieldType: "text",
      fieldText: "Model",
      key: "model",
    },
    {
      fieldType: "text",
      fieldText: "Power Net",
      key: "power_net",
    },
    {
      fieldType: "text",
      fieldText: "Operating Weight",
      key: "operatingWeight",
    },
    {
      fieldType: "text",
      fieldText: "Brand",
      key: "brand",
    },
    {
      fieldType: "date",
      fieldText: "Build Date",
      key: "builDate",
    },
    {
      fieldType: "number",
      fieldText: "Quantity",
      key: "quantity",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      const { updates, addField, fieldType } = action.payload;
      if (addField) {
        const { type } = updates;
        let fieldList = [...state[type]];
        fieldList.push({
          fieldType: "text",
          fieldText: "",
          key: `${type}_${state.length + 1}`,
        });
        return { ...state, [type]: fieldList };
      } else {
        const { text, type, value } = updates;
        let fieldList = [...state[type]];
        let field = fieldList.find((field) => {
          return field.fieldText === text;
        });
        if (fieldType) {
          field.fieldType = value;
        } else {
          field.fieldText = value;
        }
        return { ...state, [type]: fieldList };
      }
    case "REMOVE_CATEGORY":
      const type = action.payload;
      const modifiedList = { ...state };
      delete modifiedList[type];
      return modifiedList;
    case "UPDATE_CATEGORY_NAME":
      const objectType = action.payload["type"];
      const category = state[objectType];
      return state;
    case "UPDATE_NEW_CATEGORY_SCHEMA":
      const categoryName = action.payload["value"];
      const previousName = action.payload["previous"];
      let newState = {...state};
      let oldData = [];
      if(newState[previousName]) {
         oldData = [...newState[previousName]];
         delete newState[previousName];
      } 
      newState[categoryName] = oldData;
      return newState;
    default:
      return state;
  }
};

export default reducer;
