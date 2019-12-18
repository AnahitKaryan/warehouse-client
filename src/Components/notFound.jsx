import React from 'react';
import { Link } from 'react-router-dom';
import notFound from './../assets/images/notFound.jpg';

const sectionStyle = {
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRpeat: "no-repeat",
    backgroundImage: `url(${notFound})`
};

const NotFound = () => (
    <section style={ sectionStyle }>
        <center>
            <Link to="/home">
                Return to Home Page
            </Link>
        </center>
    </section>
);

export { NotFound };