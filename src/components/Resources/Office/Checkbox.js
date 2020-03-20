import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type = 'checkbox', name, id, checked = false, onChange }) => (
    <input type={type} name={name} checked={checked} id={id} onChange={onChange} />
);

Checkbox.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;