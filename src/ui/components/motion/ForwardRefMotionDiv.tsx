const ForwardRefMotionDiv = forwardRef(function MotionDiv(props: MotionDivProps, ref)  {
  <motion.div
    ref={dvMotionDiv}
    className="motion-div"
    id={"motionRight" + idNumber}
    data-left-edge={leftEdge}
    data-right-edge={rightEdge}
    data-img-movement-size-px={imgMovementSizePX}
    data-img-movement-size-perc={imgMovementSizePerc}
    data-img-size-px={imgStackSizePX}
    data-img-size-perc={imgStackSizePerc}
    animate={xRightControls}
    style={{ x: xRight, width: imgStackSizePerc }}
    whileHover={{
      scale: 3,
      translateY: 0,
      transition: { duration: 0.1 },
    }}
    whileTap={{
      scale: 10,
      translateY: 0,
      transition: { duration: 0.01 },
    }}
    exit={{ scale: 1000, transition: { duration: 0.1 } }}
  >
    <Button
      id={"meImg" + idNumber}
      name={"meImg" + idNumber}
      className="image-btn-x"
      sx={{ width: "100%" }}
    >
      {charImg}
    </Button>
  </motion.div>;
});
