import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

const AnswerMove = (props) => {
  const obj = props.obj;

  const move_class = obj === 'triangleMove' ? 'move_triangle' : 'move_paper';
  const drag_img_name = obj === 'triangleMove' ? 'icon_triangle_upper' : 'icon_paper';
  const drop_img_name = obj ==='triangleMove' ? 'icon_triangle_lower' : 'icon_trashcan_open';
  const drop_img_finish = obj === 'triangleMove' ? 'icon_triangle_finish' : 'icon_trashcan_finish';

  const [lastImage, setLastImage] = useState(false);
  // eslint-disable-next-line no-unused-vars
 // const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (lastImage === true) {
      props.onMoveSelect('success');
    } else {
      props.onMoveSelect(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastImage]);

  /* =========== Draggable js { */
  // function onStart() {
  //   setActiveDrags((prevState) => prevState + 1);
  // }

  function onStop() {
    //setActiveDrags((prevState) => prevState - 1);
    
    const container = document.querySelector('.drag_drop_area');
    const box_width = container.clientWidth;
    const box_height = container.clientHeight;
    const dropzone = document.querySelector('.dropzone');
    const dropzone_width = dropzone.clientWidth * 1.7;
    const dropzone_height = obj === 'triangleMove' ? dropzone.clientHeight * 2.1 : dropzone.clientHeight * 1.7;

    const limit_x = -box_width+dropzone_width;
    const limit_y = box_height-dropzone_height;

    if (deltaPosition.x < limit_x && deltaPosition.y > limit_y) {
      setLastImage(true);
    }
  }

  function onDrag(e, ui) {
//    console.log(ui);
    const { x, y } = deltaPosition;

    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  }
  /* } Draggable js =========== */

  return (
    <div className={`drag_drop_area ${move_class}`}>
      {lastImage === false && 
      <Draggable 
        bounds="parent"
        defaultPosition={{ x: 0, y: 0 }}
        onStop={onStop}
        onDrag={onDrag}
      >
        <span className="dragzone">
          <img src={`/assets/${drag_img_name}.svg`} alt="아이콘" />
        </span>
      </Draggable>      
      }
      {lastImage === false &&
        <span className="dropzone">
          <img src={`/assets/${drop_img_name}.svg`} alt="아이콘" />
        </span>
      }
      {lastImage === true && (
          <span className="dropzone">
            <img  src={`/assets/${drop_img_finish}.svg`} alt="완성 아이콘" />
          </span>
      )}
    </div>
  );
};

export default AnswerMove;
