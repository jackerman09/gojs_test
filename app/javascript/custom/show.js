console.log('in show.js')
$(document).ready(function(){
  // if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
  var $$ = go.GraphObject.make;

  model = $$(go.GraphLinksModel);

  myDiagram =
    $$(go.Diagram, "myDiagramDiv",
      {
        initialContentAlignment: go.Spot.Top,
        initialAutoScale: go.Diagram.UniformToFill,
        layout: $$(go.LayeredDigraphLayout,
          { direction: 90 }),
        "undoManager.isEnabled": true
      }
    );

  myDiagram.nodeTemplate =
    $$(go.Node, "Auto",
      // { background: "#44CCFF" },
      $$(go.Shape, "RoundedRectangle",
        { fill: "brown" }
      ),
      $$(go.TextBlock, "Default Text",
        { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
        new go.Binding("text", "name")
      )
    );

  myDiagram.linkTemplate =
    $$(go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      $$(go.Shape, { strokeWidth: 3, stroke: "#555" }),
      $$(go.Panel, "Auto",  // this whole Panel is a link label
        $$(go.Shape, "RoundedRectangle", { fill: "lightgray", stroke: "gray" }),
        $$(go.TextBlock, { margin: 3 },
          new go.Binding("text", "ownership"))
      )
    );

  family_tree = $('#entity-info').data('family')
  relationships = $('#entity-info').data('relationships')
  console.log(family_tree)
  console.log(relationships)
  model.nodeDataArray = family_tree
  model.linkDataArray = relationships

  // model.nodeDataArray =
  // [
  //   { key: "A",	name: "Four Star",	source: "", isGroup: true},
  //   { key: "1",	name: "BJGH",  			source: "" },
  //   { key: "2", name: "EBJ Sagamore HoldCo",  			source: "" },
  //   { key: "4", name: "Throop Kings", 				source: "", group: "A" },
  //   { key: "5", name: "141 Madison",  			source: "", group: "A" },
  //   { key: "6", name: "EBJ Sagamore",				source: "" },
  //   { key: "7", name: "EBJ Properties",				source: "" }
  // ];

  // model.linkDataArray =
  // [
  //   { from: "1", to: "2", ownership: "5%" },
  //   { from: "7", to: "2", ownership: "95%" },
  //   { from: "1", to: "A", ownership: "50%" },
  //   { from: "2", to: "6", ownership: "50%" },
  // ];

  myDiagram.model = model;
})