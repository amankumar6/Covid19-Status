import React, { useState, useEffect } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';
import { getCountries } from '../fetch';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        className="customDropDown"
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <span>{children}</span>
        <i className="fas fa-sort-down"></i>
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Search..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children.toLowerCase().startsWith(value)
                    )}
                </ul>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        );
    }
);

const DropDown = ({ handleChange }) => {
    const [getData, setData] = useState([]);
    const [value, setValue] = useState('Select a Country');

    useEffect(() => {
        const fetchData = async () => setData(await getCountries());
        fetchData();
    }, []);

    const handleClick = (e) => {
        const selected = e.target.innerHTML;
        setValue(selected);
        handleChange(selected);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                {value}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {getData ? (
                    getData.map((country, i) => (
                        <Dropdown.Item
                            key={i}
                            eventKey={i + 1}
                            onClick={handleClick}
                        >
                            {country}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item>𝐿𝑜𝒶𝒹𝒾𝓃𝑔...</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDown;
