export default {
    name: "homepage",
    title: "Homepage",
    type: "document",
  
    // These actions define what users can do with this document.
    // Notice how "delete" is not available in this array.
    // This means, users can't delete this document
    // from within the studio
    __experimental_actions: ["update", "create", "publish"],
  
    fields: [
      {
        title: "Hero Title",
        description:
          "This title will appear in the hero unit at the top of the page",
        type: "string",
        name: "heroTitle",
      },
    ],
  };