console.log('in show.js')
$(document).ready(function(){
  console.log('document is ready')
  var $$ = go.GraphObject.make;
  var myDiagram =
    $$(go.Diagram, "myDiagramDiv",
      {
        "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
        layout: $$(go.TreeLayout, // specify a Diagram.layout that arranges trees
                  { angle: 90, layerSpacing: 35 })
      });

  // the template we defined earlier
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

  	// define a Link template that routes orthogonally, with no arrowhead
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

  var model = $$(go.GraphLinksModel);

  var family_tree = $('#entity-info').data('family')
  console.log(family_tree)
  model.nodeDataArray = family_tree

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