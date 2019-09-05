import React from "react";
import "./styles.css";

const loading = props =>
    props.loading && (
        <div
            style={{ width: `${props.size}px`, height: `${props.size}px` }}
            class="spinner"
        ></div>
    );

export default loading;
