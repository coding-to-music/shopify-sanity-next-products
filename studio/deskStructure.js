import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Menu")
    .items([
      S.listItem()
        .title("Homepage")
        .child(
          S.editor()
            .id("homepage")
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["homepage"].includes(listItem.getId())
      ),
    ]);