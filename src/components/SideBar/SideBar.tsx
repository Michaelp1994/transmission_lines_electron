interface Props {}

const SideBar: React.FC<Props> = (props) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "source")}
        draggable
      >
        Source
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "bar")}
        draggable
      >
        Bar
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};

export default SideBar;
