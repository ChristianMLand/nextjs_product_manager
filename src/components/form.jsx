import styles from "@/styles/base.module.css";
import { useState } from "react";

export default function Form({ name, service, onSuccess, fields, values, clearOnSuccess }) {
    const initialValues = values || Object.keys(fields).reduce((prev, field) => ({ ...prev, [field]: "" }), {});
    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const { trigger } = service();

    const handleSubmit = e => {
        e.preventDefault(); 
        trigger(formData)
            .then(data => {
                onSuccess(data);
                if (clearOnSuccess) setFormData(initialValues);
            })
            .catch(err => setFormErrors(err.response.data)); 
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    return (
        <form onSubmit={ handleSubmit }>
            { Object.entries(fields).map(([name, type], i) => (
                <div key={ i }>
                    <input 
                        placeholder={ name } 
                        type={ type } 
                        name={ name } 
                        value={ formData[name] } 
                        onChange={ handleChange }
                    />
                    { formErrors[name] && <p className={ styles.error }>{ formErrors[name] }</p> }
                </div>
            ))}
            <button>{ name }</button>
        </form>
    );
}