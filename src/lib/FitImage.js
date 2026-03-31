import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react';
import {Image} from 'react-native';

const DEFAULT_MIN_HEIGHT = 160;

const FitImage = ({source, style, accessible, accessibilityLabel, ...rest}) => {
  const [aspectRatio, setAspectRatio] = useState(null);

  const handleLoad = useCallback((event) => {
    const {width, height} = event?.nativeEvent?.source || {};

    if (typeof width === 'number' && typeof height === 'number' && height > 0) {
      setAspectRatio(width / height);
    }
  }, []);

  return (
    <Image
      {...rest}
      source={source}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      onLoad={handleLoad}
      resizeMode="contain"
      style={[
        style,
        {width: '100%', alignSelf: 'stretch'},
        aspectRatio ? {aspectRatio} : {minHeight: DEFAULT_MIN_HEIGHT},
      ]}
    />
  );
};

FitImage.propTypes = {
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  accessible: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
};

export default React.memo(FitImage);
