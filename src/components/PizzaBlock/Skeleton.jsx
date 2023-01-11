import React from 'react';
import ContentLoader from "react-content-loader";

const Skeleton = () => {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="111" cy="111" r="111"/>
            <rect x="9" y="234" rx="15" ry="15" width="211" height="27"/>
            <rect x="4" y="276" rx="15" ry="15" width="217" height="80"/>
            <rect x="4" y="375" rx="0" ry="0" width="80" height="25"/>
            <rect x="105" y="367" rx="20" ry="20" width="126" height="37"/>
        </ContentLoader>
    );
};

export default Skeleton;