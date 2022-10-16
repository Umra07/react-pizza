import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="138" cy="126" r="118" />
    <rect x="0" y="259" rx="10" ry="10" width="280" height="28" />
    <rect x="0" y="304" rx="15" ry="15" width="280" height="75" />
    <rect x="0" y="403" rx="10" ry="10" width="70" height="27" />
    <rect x="129" y="392" rx="21" ry="21" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
