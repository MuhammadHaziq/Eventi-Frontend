import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

var i = 0;

const AppProgress = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      i = 0;
      myLoop();
    } else {
      setProgress(100);
      i = 100;
    }
  }, [loading]);

  const myLoop = () => {
    setTimeout(() => {
      setProgress((prevValue) => {
        return prevValue + 5;
      });
      i++;
      if (i < 100) {
        myLoop();
      }
    }, 200);
  };

  return (
    <div>
      <LoadingBar
        height={4}
        shadowStyle
        color="#177EC1"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>
  );
};

export default AppProgress;
