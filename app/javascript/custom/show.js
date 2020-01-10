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

  // when the document is modified, add a "*" to the title and enable the "Save" button
  myDiagram.addDiagramListener("Modified", function(e) {
    var button = document.getElementById("SaveButton");
    if (button) button.disabled = !myDiagram.isModified;
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }
  });

  // when the diagram is vertically oriented, "left" means "top" and "right" means "bottom"
  function makePort(name, leftside) {
    var port = $$(go.Shape, "Circle",
      {
        fill: "gray", stroke: null,
        desiredSize: new go.Size(8, 8),
        portId: name,  // declare this object to be a "port"
        toMaxLinks: 1,  // don't allow more than one link into a port
        cursor: "pointer"  // show a different cursor to indicate potential link point
      });

    var lab = $$(go.TextBlock, name,  // the name of the port
      { font: "7pt sans-serif" });

    var panel = $$(go.Panel, "Vertical",
      { margin: new go.Margin(0, 2) });

    if (leftside) {
      port.toSpot = go.Spot.Top;
      port.toLinkable = true;
      lab.margin = new go.Margin(1, 0, 0, 1);
      panel.alignment = go.Spot.TopLeft;
      panel.add(port);
      panel.add(lab);
    } else {
      port.fromSpot = go.Spot.Bottom;
      port.fromLinkable = true;
      lab.margin = new go.Margin(1, 1, 0, 0);
      panel.alignment = go.Spot.TopRight;
      panel.add(lab);
      panel.add(port);
    }
    return panel;
  }

  function makeTemplate(typename, icon, background, inports, outports) {
    var node = $$(go.Node, "Spot",
      $$(go.Panel, "Auto",
        { width: 200, height: 90 },
        $$(go.Shape, "RoundedRectangle",
          {
            fill: background,
            spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight
          }),
        $$(go.Panel, "Table",
          $$(go.TextBlock, typename,
            {
              column: 0,
              margin: 3,
              maxSize: new go.Size(80, NaN),
              stroke: "black",
              font: "bold 10pt sans-serif"
            }),
          $$(go.Picture, icon,
            { column: 1, width: 55, height: 55 }),
          $$(go.TextBlock,
            {
              column: 2,
              margin: 3,
              editable: true,
              maxSize: new go.Size(80, 40),
              stroke: "black",
              font: "bold 9pt sans-serif"
            },
            new go.Binding("text", "name").makeTwoWay())
        )
      ),
      $$(go.Panel, "Horizontal",
        {
          alignment: go.Spot.Top,
          alignmentFocus: new go.Spot(0.5, 0, 0, 8)
        },
        inports),
      $$(go.Panel, "Horizontal",
        {
          alignment: go.Spot.Bottom,
          alignmentFocus: new go.Spot(0.5, 1, 0, -8)
        },
        outports)
    );
    myDiagram.nodeTemplateMap.set(typename, node);
  }

  myDiagram.linkTemplate =
    $$(go.Link,
      {
        routing: go.Link.Orthogonal, corner: 5,
        relinkableFrom: true, relinkableTo: true
      },
      $$(go.Shape, { stroke: "gray", strokeWidth: 2 }),
      $$(go.Shape, { stroke: "gray", fill: "gray", toArrow: "Standard" })
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